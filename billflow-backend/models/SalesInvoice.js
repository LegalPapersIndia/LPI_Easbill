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

const salesInvoiceSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BusinessSettings",
      required: true,
    },
    invoiceNo: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    paymentTerms: { type: Number, default: 0 },
    dueDate: { type: Date },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
      required: true,
    },

    lines: { type: [lineItemSchema], required: true },

    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    shipping: { type: Number, default: 0 },
    gstBreakup: { type: Number, default: 0 },
    grandTotal: { type: Number, required: true },

    amountReceived: { type: Number, default: 0 },
    paymentMode: { type: String, default: "Cash" },

    notes: { type: String, default: "" },
    terms: { type: String, default: "" },

    isDraft: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("SalesInvoice", salesInvoiceSchema);