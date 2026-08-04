import mongoose from "mongoose";

const lineItemSchema = new mongoose.Schema(
  {
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
    name: { type: String, required: true },
    hsnCode: { type: String, default: "" },
    unit: { type: String, default: "" },
    qty: { type: Number, required: true },
    rate: { type: Number, required: true },
    gstPercent: { type: Number, default: 0 },
  },
  { _id: false }
);

const quotationSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BusinessSettings",
      required: true,
    },
    quotationNo: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    validDays: { type: Number, default: 30 },
    validTillDate: { type: Date },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
      required: true,
    },

    lines: { type: [lineItemSchema], required: true },

    subtotal: { type: Number, required: true },
    gstBreakup: { type: Number, default: 0 },
    grandTotal: { type: Number, required: true },

    notes: { type: String, default: "" },
    terms: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Quotation", quotationSchema);