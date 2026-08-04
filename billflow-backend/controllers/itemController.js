import Item from "../models/Item.js";
import Group from "../models/Group.js";
import Brand from "../models/Brand.js";

// ─────────────────────────────────────────
// CREATE ITEM
// ─────────────────────────────────────────
export const createItem = async (req, res) => {
  try {
    const item = await Item.create({
      ...req.body,
      companyId: req.companyId,
    });

    res.status(201).json({
      success: true,
      message: "Item added successfully",
      item,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// GET ALL ITEMS (search/filter ke saath)
// ─────────────────────────────────────────
export const getItems = async (req, res) => {
  try {
    const { search, itemType, group } = req.query;

    const query = { companyId: req.companyId };

    if (itemType) query.itemType = itemType;
    if (group) query.group = group;

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { sku: { $regex: search, $options: "i" } },
      ];
    }

    const items = await Item.find(query).sort({ createdAt: -1 });

    res.status(200).json({ success: true, items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// GET SINGLE ITEM
// ─────────────────────────────────────────
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id, companyId: req.companyId });

    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    res.status(200).json({ success: true, item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// UPDATE ITEM
// ─────────────────────────────────────────
export const updateItem = async (req, res) => {
  try {
    const item = await Item.findOneAndUpdate(
      { _id: req.params.id, companyId: req.companyId },
      req.body,
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      item,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// DELETE ITEM
// ─────────────────────────────────────────
export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findOneAndDelete({ _id: req.params.id, companyId: req.companyId });

    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    res.status(200).json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// STATS — Stock Value | Low Stock Count
// ─────────────────────────────────────────
export const getItemStats = async (req, res) => {
  try {
    const items = await Item.find({ companyId: req.companyId, itemType: "Product" });

    const stockValue = items.reduce((sum, i) => sum + i.stockQty * i.purchasePrice, 0);
    const lowStockCount = items.filter(
      (i) => i.lowStockEnabled && i.stockQty <= i.lowStockThreshold
    ).length;

    res.status(200).json({ success: true, stats: { stockValue, lowStockCount } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// GROUPS — List + Create (Inline Add Ke Liye)
// ─────────────────────────────────────────
export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find({ companyId: req.companyId }).sort({ name: 1 });
    res.status(200).json({ success: true, groups });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createGroup = async (req, res) => {
  try {
    const { name } = req.body;

    // Duplicate na bane isी company ke andar
    const existing = await Group.findOne({ companyId: req.companyId, name });
    if (existing) {
      return res.status(200).json({ success: true, group: existing });
    }

    const group = await Group.create({ companyId: req.companyId, name });
    res.status(201).json({ success: true, group });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────
// BRANDS — List + Create
// ─────────────────────────────────────────
export const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find({ companyId: req.companyId }).sort({ name: 1 });
    res.status(200).json({ success: true, brands });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createBrand = async (req, res) => {
  try {
    const { name } = req.body;

    const existing = await Brand.findOne({ companyId: req.companyId, name });
    if (existing) {
      return res.status(200).json({ success: true, brand: existing });
    }

    const brand = await Brand.create({ companyId: req.companyId, name });
    res.status(201).json({ success: true, brand });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};