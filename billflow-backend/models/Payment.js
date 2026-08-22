import mongoose from "mongoose";

const allocationSchema = new mongoose.Schema(
  {
    invoiceId: { type: mongoose.Schema.Types.ObjectId, required: true },
    invoiceModel: { type: String, enum: ["SalesInvoice", "PurchaseInvoice"], required: true },
    invoiceNo: { type: String, default: "" },
    amountAllocated: { type: Number, required: true },
  },
  { _id: false }
);

const paymentSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BusinessSettings",
      required: true,
    },
    paymentNo: { type: String, required: true },
    type: { type: String, enum: ["in", "out"], required: true },
    date: { type: Date, required: true, default: Date.now },

    partyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
      required: true,
    },

    amount: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    mode: { type: String, default: "Cash" },
    notes: { type: String, default: "" },

    allocations: { type: [allocationSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);