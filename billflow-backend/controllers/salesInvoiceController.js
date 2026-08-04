import mongoose from "mongoose";
import SalesInvoice from "../models/SalesInvoice.js";
import Item from "../models/Item.js";
import Ledger from "../models/Ledger.js";
import BusinessSettings from "../models/BusinessSettings.js";
import { getFinancialYear } from "../utils/financialYear.js";

// ─────────────────────────────────────────
// HELPER — Agla Invoice Number Generate Karo
// ─────────────────────────────────────────
const generateInvoiceNo = async (companyId) => {
  const fy = getFinancialYear();
  const count = await SalesInvoice.countDocuments({ companyId });
  return `INV/${fy}/${String(count + 1).padStart(3, "0")}`;
};

// ─────────────────────────────────────────
// CREATE SALES INVOICE (TRANSACTION — Invoice + Stock + Ledger ek sath)
// ─────────────────────────────────────────
export const createSalesInvoice = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { date, paymentTerms, customerId, lines, discount, shipping, amountReceived, paymentMode, notes, terms, isDraft } = req.body;

    // ── TOTALS CALCULATE KARO ──
    let subtotal = 0;
    let gstBreakup = 0;
    lines.forEach((line) => {
      const amount = line.qty * line.rate;
      subtotal += amount;
      gstBreakup += (amount * (line.gstPercent || 0)) / 100;
    });

    const discountAmt = Number(discount || 0);
    const gross = subtotal - discountAmt;
    const scale = subtotal > 0 ? gross / subtotal : 1;
    const adjustedGst = gstBreakup * scale;
    const grandTotal = gross + adjustedGst + Number(shipping || 0);

    const dueDate = new Date(date);
    dueDate.setDate(dueDate.getDate() + Number(paymentTerms || 0));

    const invoiceNo = await generateInvoiceNo(req.companyId);

    // ── STEP 1: INVOICE SAVE KARO ──
    const invoice = await SalesInvoice.create(
      [{
        companyId: req.companyId,
        invoiceNo,
        date,
        paymentTerms,
        dueDate,
        customerId,
        lines,
        subtotal,
        discount: discountAmt,
        shipping: Number(shipping || 0),
        gstBreakup: adjustedGst,
        grandTotal,
        amountReceived: Number(amountReceived || 0),
        paymentMode,
        notes,
        terms,
        isDraft: !!isDraft,
      }],
      { session }
    );

    // ── STEP 2: STOCK KAM KARO (sirf non-draft invoices ke liye) ──
    if (!isDraft) {
      for (const line of lines) {
        if (line.itemId) {
          await Item.findByIdAndUpdate(
            line.itemId,
            { $inc: { stockQty: -line.qty } },
            { session }
          );
        }
      }

      // ── STEP 3: LEDGER ENTRY ADD KARO ──
      await Ledger.create(
        [{
          companyId: req.companyId,
          contactId: customerId,
          type: "sales_invoice",
          refId: invoice[0]._id,
          refNumber: invoiceNo,
          amount: grandTotal,
          date,
        }],
        { session }
      );
    }

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "Sales Invoice created successfully",
      invoice: invoice[0],
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// GET ALL SALES INVOICES (list + stats ke liye)
// ─────────────────────────────────────────
export const getSalesInvoices = async (req, res) => {
  try {
    const { search } = req.query;

    const query = { companyId: req.companyId };
    if (search) {
      query.invoiceNo = { $regex: search, $options: "i" };
    }

    const invoices = await SalesInvoice.find(query)
      .populate("customerId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, invoices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// GET SINGLE INVOICE (Print Preview ke liye)
// ─────────────────────────────────────────
export const getSalesInvoiceById = async (req, res) => {
  try {
    const invoice = await SalesInvoice.findOne({
      _id: req.params.id,
      companyId: req.companyId,
    }).populate("customerId");

    if (!invoice) {
      return res.status(404).json({ success: false, message: "Invoice not found" });
    }

    res.status(200).json({ success: true, invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// STATS — Total Sales | Paid | Unpaid (live calculate)
// ─────────────────────────────────────────
export const getSalesInvoiceStats = async (req, res) => {
  try {
    const invoices = await SalesInvoice.find({ companyId: req.companyId, isDraft: false });

    const total = invoices.reduce((sum, i) => sum + i.grandTotal, 0);
    const paid = invoices
      .filter((i) => i.amountReceived >= i.grandTotal)
      .reduce((sum, i) => sum + i.grandTotal, 0);
    const unpaid = invoices
      .filter((i) => i.amountReceived < i.grandTotal)
      .reduce((sum, i) => sum + (i.grandTotal - i.amountReceived), 0);

    res.status(200).json({ success: true, stats: { total, paid, unpaid } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// DELETE SALES INVOICE
// ─────────────────────────────────────────
export const deleteSalesInvoice = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const invoice = await SalesInvoice.findOne({ _id: req.params.id, companyId: req.companyId });

    if (!invoice) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ success: false, message: "Invoice not found" });
    }

    // ── STOCK WAPAS BADHAO (jo becha tha wo wapas aa jaye) ──
    if (!invoice.isDraft) {
      for (const line of invoice.lines) {
        if (line.itemId) {
          await Item.findByIdAndUpdate(
            line.itemId,
            { $inc: { stockQty: line.qty } },
            { session }
          );
        }
      }
      // ── LEDGER ENTRY BHI HATAO ──
      await Ledger.deleteMany({ refId: invoice._id }, { session });
    }

    await SalesInvoice.findByIdAndDelete(invoice._id, { session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ success: true, message: "Invoice deleted successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ success: false, message: error.message });
  }
};