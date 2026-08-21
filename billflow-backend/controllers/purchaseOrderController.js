import PurchaseOrder from "../models/PurchaseOrder.js";
import { getFinancialYear } from "../utils/financialYear.js";

const generatePoNo = async (companyId) => {
  const fy = getFinancialYear();
  const count = await PurchaseOrder.countDocuments({ companyId });
  return `PO/${fy}/${String(count + 1).padStart(3, "0")}`;
};

// ─────────────────────────────────────────
// CREATE PURCHASE ORDER (koi transaction nahi)
// ─────────────────────────────────────────
export const createPurchaseOrder = async (req, res) => {
  try {
    const { date, validTillDays, supplierId, lines, notes, terms } = req.body;

    let subtotal = 0;
    let gstBreakup = 0;
    lines.forEach((line) => {
      const amount = line.qty * line.rate;
      subtotal += amount;
      gstBreakup += (amount * (line.gstPercent || 0)) / 100;
    });

    const grandTotal = subtotal + gstBreakup;

    const validTillDate = new Date(date);
    validTillDate.setDate(validTillDate.getDate() + Number(validTillDays || 0));

    const poNo = await generatePoNo(req.companyId);

    const purchaseOrder = await PurchaseOrder.create({
      companyId: req.companyId,
      poNo,
      date,
      validTillDays,
      validTillDate,
      supplierId,
      lines,
      subtotal,
      gstBreakup,
      grandTotal,
      notes,
      terms,
    });

    res.status(201).json({
      success: true,
      message: "Purchase Order created successfully",
      purchaseOrder,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// GET ALL PURCHASE ORDERS
// ─────────────────────────────────────────
export const getPurchaseOrders = async (req, res) => {
  try {
    const { search } = req.query;

    const query = { companyId: req.companyId };
    if (search) {
      query.poNo = { $regex: search, $options: "i" };
    }

    const purchaseOrders = await PurchaseOrder.find(query)
      .populate("supplierId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, purchaseOrders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// GET SINGLE PURCHASE ORDER
// ─────────────────────────────────────────
export const getPurchaseOrderById = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findOne({
      _id: req.params.id,
      companyId: req.companyId,
    }).populate("supplierId");

    if (!purchaseOrder) {
      return res.status(404).json({ success: false, message: "Purchase Order not found" });
    }

    res.status(200).json({ success: true, purchaseOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// DELETE PURCHASE ORDER
// ─────────────────────────────────────────
export const deletePurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findOneAndDelete({ _id: req.params.id, companyId: req.companyId });

    if (!purchaseOrder) {
      return res.status(404).json({ success: false, message: "Purchase Order not found" });
    }

    res.status(200).json({ success: true, message: "Purchase Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};