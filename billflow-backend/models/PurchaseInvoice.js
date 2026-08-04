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

const purchaseInvoiceSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BusinessSettings",
      required: true,
    },
    purchaseNo: { type: String, required: true },
    originalInvoiceNo: { type: String, default: "" }, // supplier ka apna invoice number
    date: { type: Date, required: true, default: Date.now },
    paymentTerms: { type: Number, default: 0 },
    dueDate: { type: Date },

    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
      required: true,
    },

    lines: { type: [lineItemSchema], required: true },

    subtotal: { type: Number, required: true },
    gstBreakup: { type: Number, default: 0 },
    grandTotal: { type: Number, required: true },

    amountPaid: { type: Number, default: 0 },
    paymentMode: { type: String, default: "Cash" },

    notes: { type: String, default: "" },
    terms: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("PurchaseInvoice", purchaseInvoiceSchema);