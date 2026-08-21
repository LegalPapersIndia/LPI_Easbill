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

const returnSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BusinessSettings",
      required: true,
    },
    type: { type: String, enum: ["sales", "purchase"], required: true },
    returnNo: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },

    // Linked invoice ka reference (Sales ya Purchase invoice, type ke hisaab se)
    linkedInvoiceId: { type: mongoose.Schema.Types.ObjectId, required: true },
    linkedInvoiceNo: { type: String, required: true },

    partyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
      required: true,
    },

    lines: { type: [lineItemSchema], required: true },

    subtotal: { type: Number, required: true },
    gstBreakup: { type: Number, default: 0 },
    grandTotal: { type: Number, required: true },

    refundAmount: { type: Number, default: 0 },
    paymentMode: { type: String, default: "Cash" },
  },
  { timestamps: true }
);

export default mongoose.model("Return", returnSchema);