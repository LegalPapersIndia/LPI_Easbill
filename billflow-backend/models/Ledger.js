import mongoose from "mongoose";

const ledgerSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BusinessSettings",
      required: true,
    },
    contactId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
      required: true,
    },
    type: {
      type: String,
      enum: ["sales_invoice", "purchase_invoice", "payment_in", "payment_out", "sales_return", "purchase_return"],
      required: true,
    },
    refId: { type: mongoose.Schema.Types.ObjectId, required: true }, // konsi invoice/payment se link hai
    refNumber: { type: String, default: "" }, // jaise "INV/26-27/105"
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Ledger", ledgerSchema);