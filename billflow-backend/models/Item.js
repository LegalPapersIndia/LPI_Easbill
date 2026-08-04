import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BusinessSettings",
      required: true,
    },

    itemType: { type: String, enum: ["Product", "Service"], required: true, default: "Product" },
    name: { type: String, required: true },
    sku: { type: String, default: "" },

    group: { type: String, default: "" },
    brand: { type: String, default: "" },

    // ── Product-specific fields ──
    purchasePrice: { type: Number, default: 0 },
    purchasePriceType: { type: String, enum: ["with_tax", "without_tax"], default: "without_tax" },
    salePrice: { type: Number, default: 0 },
    salePriceType: { type: String, enum: ["with_tax", "without_tax"], default: "with_tax" },
    stockQty: { type: Number, default: 0 },
    unit: { type: String, default: "PCS" },
    altUnit: { type: String, default: "" },
    lowStockEnabled: { type: Boolean, default: false },
    lowStockThreshold: { type: Number, default: 0 },
    asOfDate: { type: Date, default: Date.now },

    // ── Service-specific fields ──
    serviceCharge: { type: Number, default: 0 },
    minServiceCharge: { type: Number, default: 0 },

    // ── Common fields ──
    gstPercent: { type: Number, default: 0 },
    discountPercent: { type: Number, default: 0 },
    hsnCode: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);