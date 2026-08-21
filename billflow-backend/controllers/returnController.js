import mongoose from "mongoose";
import Return from "../models/Return.js";
import Item from "../models/Item.js";
import Ledger from "../models/Ledger.js";
import { getFinancialYear } from "../utils/financialYear.js";

const generateReturnNo = async (companyId, type) => {
  const fy = getFinancialYear();
  const prefix = type === "sales" ? "SR" : "PR";
  const count = await Return.countDocuments({ companyId, type });
  return `${prefix}/${fy}/${String(count + 1).padStart(3, "0")}`;
};

// ─────────────────────────────────────────
// CREATE RETURN (TRANSACTION — Return + Stock + Ledger)
// ─────────────────────────────────────────
export const createReturn = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { type, date, linkedInvoiceId, linkedInvoiceNo, partyId, lines, refundAmount, paymentMode } = req.body;

    let subtotal = 0;
    let gstBreakup = 0;
    lines.forEach((line) => {
      const amount = line.qty * line.rate;
      subtotal += amount;
      gstBreakup += (amount * (line.gstPercent || 0)) / 100;
    });

    const grandTotal = subtotal + gstBreakup;

    const returnNo = await generateReturnNo(req.companyId, type);

    // ── STEP 1: RETURN SAVE KARO ──
    const returnDoc = await Return.create(
      [{
        companyId: req.companyId,
        type,
        returnNo,
        date,
        linkedInvoiceId,
        linkedInvoiceNo,
        partyId,
        lines,
        subtotal,
        gstBreakup,
        grandTotal,
        refundAmount: Number(refundAmount || 0),
        paymentMode,
      }],
      { session }
    );

    // ── STEP 2: STOCK ADJUST KARO ──
    // Sales Return = maal wapas aaya → Stock BADHTA hai
    // Purchase Return = maal wapas gaya → Stock KAM hota hai
    for (const line of lines) {
      if (line.itemId) {
        const stockChange = type === "sales" ? line.qty : -line.qty;
        await Item.findByIdAndUpdate(
          line.itemId,
          { $inc: { stockQty: stockChange } },
          { session }
        );
      }
    }

    // ── STEP 3: LEDGER ENTRY (negative amount — balance kam karega) ──
    await Ledger.create(
      [{
        companyId: req.companyId,
        contactId: partyId,
        type: type === "sales" ? "sales_return" : "purchase_return",
        refId: returnDoc[0]._id,
        refNumber: returnNo,
        amount: -grandTotal, // negative — party ka balance reduce karega
        date,
      }],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "Return created successfully",
      return: returnDoc[0],
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// GET ALL RETURNS (type ke hisaab se filter)
// ─────────────────────────────────────────
export const getReturns = async (req, res) => {
  try {
    const { type } = req.query;

    const query = { companyId: req.companyId };
    if (type) query.type = type;

    const returns = await Return.find(query)
      .populate("partyId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, returns });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// GET SINGLE RETURN
// ─────────────────────────────────────────
export const getReturnById = async (req, res) => {
  try {
    const returnDoc = await Return.findOne({
      _id: req.params.id,
      companyId: req.companyId,
    }).populate("partyId");

    if (!returnDoc) {
      return res.status(404).json({ success: false, message: "Return not found" });
    }

    res.status(200).json({ success: true, return: returnDoc });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// DELETE RETURN (stock/ledger reverse)
// ─────────────────────────────────────────
export const deleteReturn = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const returnDoc = await Return.findOne({ _id: req.params.id, companyId: req.companyId });

    if (!returnDoc) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ success: false, message: "Return not found" });
    }

    // ── STOCK REVERSE KARO ──
    for (const line of returnDoc.lines) {
      if (line.itemId) {
        const stockChange = returnDoc.type === "sales" ? -line.qty : line.qty;
        await Item.findByIdAndUpdate(
          line.itemId,
          { $inc: { stockQty: stockChange } },
          { session }
        );
      }
    }

    await Ledger.deleteMany({ refId: returnDoc._id }, { session });
    await Return.findByIdAndDelete(returnDoc._id, { session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ success: true, message: "Return deleted successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ success: false, message: error.message });
  }
};