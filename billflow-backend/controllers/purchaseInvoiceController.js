import mongoose from "mongoose";
import PurchaseInvoice from "../models/PurchaseInvoice.js";
import Item from "../models/Item.js";
import Ledger from "../models/Ledger.js";
import { getFinancialYear } from "../utils/financialYear.js";

const generatePurchaseNo = async (companyId) => {
  const fy = getFinancialYear();
  const count = await PurchaseInvoice.countDocuments({ companyId });
  return `PUR/${fy}/${String(count + 1).padStart(3, "0")}`;
};

// ─────────────────────────────────────────
// CREATE PURCHASE INVOICE (TRANSACTION — Invoice + Stock + Ledger)
// ─────────────────────────────────────────
export const createPurchaseInvoice = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { originalInvoiceNo, date, paymentTerms, supplierId, lines, amountPaid, paymentMode, notes, terms } = req.body;

    let subtotal = 0;
    let gstBreakup = 0;
    lines.forEach((line) => {
      const amount = line.qty * line.rate;
      subtotal += amount;
      gstBreakup += (amount * (line.gstPercent || 0)) / 100;
    });

    const grandTotal = subtotal + gstBreakup;

    const dueDate = new Date(date);
    dueDate.setDate(dueDate.getDate() + Number(paymentTerms || 0));

    const purchaseNo = await generatePurchaseNo(req.companyId);

    // ── STEP 1: PURCHASE INVOICE SAVE KARO ──
    const purchase = await PurchaseInvoice.create(
      [{
        companyId: req.companyId,
        purchaseNo,
        originalInvoiceNo,
        date,
        paymentTerms,
        dueDate,
        supplierId,
        lines,
        subtotal,
        gstBreakup,
        grandTotal,
        amountPaid: Number(amountPaid || 0),
        paymentMode,
        notes,
        terms,
      }],
      { session }
    );

    // ── STEP 2: STOCK BADHAO (Purchase = maal aaya) ──
    for (const line of lines) {
      if (line.itemId) {
        await Item.findByIdAndUpdate(
          line.itemId,
          { $inc: { stockQty: line.qty } },
          { session }
        );
      }
    }

    // ── STEP 3: LEDGER ENTRY ADD KARO ──
    await Ledger.create(
      [{
        companyId: req.companyId,
        contactId: supplierId,
        type: "purchase_invoice",
        refId: purchase[0]._id,
        refNumber: purchaseNo,
        amount: grandTotal,
        date,
      }],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "Purchase Invoice created successfully",
      purchase: purchase[0],
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// GET ALL PURCHASE INVOICES
// ─────────────────────────────────────────
export const getPurchaseInvoices = async (req, res) => {
  try {
    const { search } = req.query;

    const query = { companyId: req.companyId };
    if (search) {
      query.purchaseNo = { $regex: search, $options: "i" };
    }

    const purchases = await PurchaseInvoice.find(query)
      .populate("supplierId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, purchases });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// GET SINGLE PURCHASE INVOICE
// ─────────────────────────────────────────
export const getPurchaseInvoiceById = async (req, res) => {
  try {
    const purchase = await PurchaseInvoice.findOne({
      _id: req.params.id,
      companyId: req.companyId,
    }).populate("supplierId");

    if (!purchase) {
      return res.status(404).json({ success: false, message: "Purchase Invoice not found" });
    }

    res.status(200).json({ success: true, purchase });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// STATS — Total Purchases | Paid | Unpaid
// ─────────────────────────────────────────
export const getPurchaseInvoiceStats = async (req, res) => {
  try {
    const purchases = await PurchaseInvoice.find({ companyId: req.companyId });

    const total = purchases.reduce((sum, p) => sum + p.grandTotal, 0);
    const paid = purchases
      .filter((p) => p.amountPaid >= p.grandTotal)
      .reduce((sum, p) => sum + p.grandTotal, 0);
    const unpaid = purchases
      .filter((p) => p.amountPaid < p.grandTotal)
      .reduce((sum, p) => sum + (p.grandTotal - p.amountPaid), 0);

    res.status(200).json({ success: true, stats: { total, paid, unpaid } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// DELETE PURCHASE INVOICE
// ─────────────────────────────────────────
export const deletePurchaseInvoice = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const purchase = await PurchaseInvoice.findOne({ _id: req.params.id, companyId: req.companyId });

    if (!purchase) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ success: false, message: "Purchase Invoice not found" });
    }

    // ── STOCK WAPAS KAM KARO (jo khareeda tha wo cancel ho raha hai) ──
    for (const line of purchase.lines) {
      if (line.itemId) {
        await Item.findByIdAndUpdate(
          line.itemId,
          { $inc: { stockQty: -line.qty } },
          { session }
        );
      }
    }

    await Ledger.deleteMany({ refId: purchase._id }, { session });
    await PurchaseInvoice.findByIdAndDelete(purchase._id, { session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ success: true, message: "Purchase Invoice deleted successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ success: false, message: error.message });
  }
};