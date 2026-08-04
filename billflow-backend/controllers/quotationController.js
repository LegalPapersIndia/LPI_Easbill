import Quotation from "../models/Quotation.js";
import { getFinancialYear } from "../utils/financialYear.js";

const generateQuotationNo = async (companyId) => {
  const fy = getFinancialYear();
  const count = await Quotation.countDocuments({ companyId });
  return `QUO/${fy}/${String(count + 1).padStart(3, "0")}`;
};

// ─────────────────────────────────────────
// CREATE QUOTATION (koi transaction nahi — simple save)
// ─────────────────────────────────────────
export const createQuotation = async (req, res) => {
  try {
    const { date, validDays, customerId, lines, notes, terms } = req.body;

    let subtotal = 0;
    let gstBreakup = 0;
    lines.forEach((line) => {
      const amount = line.qty * line.rate;
      subtotal += amount;
      gstBreakup += (amount * (line.gstPercent || 0)) / 100;
    });

    const grandTotal = subtotal + gstBreakup;

    const validTillDate = new Date(date);
    validTillDate.setDate(validTillDate.getDate() + Number(validDays || 0));

    const quotationNo = await generateQuotationNo(req.companyId);

    const quotation = await Quotation.create({
      companyId: req.companyId,
      quotationNo,
      date,
      validDays,
      validTillDate,
      customerId,
      lines,
      subtotal,
      gstBreakup,
      grandTotal,
      notes,
      terms,
    });

    res.status(201).json({
      success: true,
      message: "Quotation created successfully",
      quotation,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// GET ALL QUOTATIONS
// ─────────────────────────────────────────
export const getQuotations = async (req, res) => {
  try {
    const { search } = req.query;

    const query = { companyId: req.companyId };
    if (search) {
      query.quotationNo = { $regex: search, $options: "i" };
    }

    const quotations = await Quotation.find(query)
      .populate("customerId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, quotations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// GET SINGLE QUOTATION
// ─────────────────────────────────────────
export const getQuotationById = async (req, res) => {
  try {
    const quotation = await Quotation.findOne({
      _id: req.params.id,
      companyId: req.companyId,
    }).populate("customerId");

    if (!quotation) {
      return res.status(404).json({ success: false, message: "Quotation not found" });
    }

    res.status(200).json({ success: true, quotation });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// DELETE QUOTATION
// ─────────────────────────────────────────
export const deleteQuotation = async (req, res) => {
  try {
    const quotation = await Quotation.findOneAndDelete({ _id: req.params.id, companyId: req.companyId });

    if (!quotation) {
      return res.status(404).json({ success: false, message: "Quotation not found" });
    }

    res.status(200).json({ success: true, message: "Quotation deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};