import mongoose from "mongoose";
import Payment from "../models/Payment.js";
import SalesInvoice from "../models/SalesInvoice.js";
import PurchaseInvoice from "../models/PurchaseInvoice.js";
import Ledger from "../models/Ledger.js";
import { getFinancialYear } from "../utils/financialYear.js";

const generatePaymentNo = async (companyId, type) => {
  const fy = getFinancialYear();
  const prefix = type === "in" ? "PMT-IN" : "PMT-OUT";
  const count = await Payment.countDocuments({ companyId, type });
  return `${prefix}/${fy}/${String(count + 1).padStart(3, "0")}`;
};

// ─────────────────────────────────────────
// GET PENDING INVOICES (party select karne ke baad checklist ke liye)
// ─────────────────────────────────────────
export const getPendingInvoices = async (req, res) => {
  try {
    const { partyId, type } = req.query;

    if (!partyId || !type) {
      return res.status(400).json({ success: false, message: "partyId aur type zaroori hain" });
    }

    if (type === "in") {
      const invoices = await SalesInvoice.find({
        companyId: req.companyId,
        customerId: partyId,
        isDraft: false,
      }).sort({ date: -1 });

      const pending = invoices
        .filter((inv) => inv.amountReceived < inv.grandTotal)
        .map((inv) => ({
          _id: inv._id,
          invoiceNo: inv.invoiceNo,
          date: inv.date,
          grandTotal: inv.grandTotal,
          due: inv.grandTotal - inv.amountReceived,
          invoiceModel: "SalesInvoice",
        }));

      return res.status(200).json({ success: true, invoices: pending });
    } else {
      const invoices = await PurchaseInvoice.find({
        companyId: req.companyId,
        supplierId: partyId,
      }).sort({ date: -1 });

      const pending = invoices
        .filter((inv) => inv.amountPaid < inv.grandTotal)
        .map((inv) => ({
          _id: inv._id,
          invoiceNo: inv.purchaseNo,
          date: inv.date,
          grandTotal: inv.grandTotal,
          due: inv.grandTotal - inv.amountPaid,
          invoiceModel: "PurchaseInvoice",
        }));

      return res.status(200).json({ success: true, invoices: pending });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// CREATE PAYMENT (TRANSACTION — Payment + Invoices update + Ledger)
// ─────────────────────────────────────────
export const createPayment = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { type, date, partyId, amount, discount, mode, notes, allocations } = req.body;

    const paymentNo = await generatePaymentNo(req.companyId, type);

    // ── STEP 1: PAYMENT SAVE KARO ──
    const payment = await Payment.create(
      [{
        companyId: req.companyId,
        paymentNo,
        type,
        date,
        partyId,
        amount: Number(amount),
        discount: Number(discount || 0),
        mode,
        notes,
        allocations: allocations || [],
      }],
      { session }
    );

    // ── STEP 2: HAR LINKED INVOICE KA amountReceived/amountPaid BADHAO ──
    for (const alloc of allocations || []) {
      const Model = alloc.invoiceModel === "SalesInvoice" ? SalesInvoice : PurchaseInvoice;
      const field = alloc.invoiceModel === "SalesInvoice" ? "amountReceived" : "amountPaid";

      await Model.findByIdAndUpdate(
        alloc.invoiceId,
        { $inc: { [field]: alloc.amountAllocated } },
        { session }
      );
    }

    // ── STEP 3: LEDGER ENTRY ──
    // Payment In = party ka due kam hota hai (negative amount, jaise Return)
    // Payment Out = humara supplier ko due kam hota hai (same, negative)
    await Ledger.create(
      [{
        companyId: req.companyId,
        contactId: partyId,
        type: type === "in" ? "payment_in" : "payment_out",
        refId: payment[0]._id,
        refNumber: paymentNo,
        amount: -Number(amount),
        date,
      }],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "Payment recorded successfully",
      payment: payment[0],
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// GET ALL PAYMENTS
// ─────────────────────────────────────────
export const getPayments = async (req, res) => {
  try {
    const { type } = req.query;

    const query = { companyId: req.companyId };
    if (type) query.type = type;

    const payments = await Payment.find(query)
      .populate("partyId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// DELETE PAYMENT (invoices + ledger reverse)
// ─────────────────────────────────────────
export const deletePayment = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const payment = await Payment.findOne({ _id: req.params.id, companyId: req.companyId });

    if (!payment) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    // ── INVOICES KA amountReceived/amountPaid WAPAS KAM KARO ──
    for (const alloc of payment.allocations) {
      const Model = alloc.invoiceModel === "SalesInvoice" ? SalesInvoice : PurchaseInvoice;
      const field = alloc.invoiceModel === "SalesInvoice" ? "amountReceived" : "amountPaid";

      await Model.findByIdAndUpdate(
        alloc.invoiceId,
        { $inc: { [field]: -alloc.amountAllocated } },
        { session }
      );
    }

    await Ledger.deleteMany({ refId: payment._id }, { session });
    await Payment.findByIdAndDelete(payment._id, { session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ success: true, message: "Payment deleted successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ success: false, message: error.message });
  }
};