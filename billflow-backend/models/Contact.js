import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BusinessSettings",
      required: true,
    },

    name: { type: String, required: true },
    mobile: { type: String, default: "" },
    email: { type: String, default: "" },

    openingBalance: { type: Number, default: 0 },
    balanceType: { type: String, enum: ["collect", "pay"], default: "collect" },

    gstin: { type: String, default: "" },
    pan: { type: String, default: "" },

    contactType: { type: String, enum: ["Customer", "Supplier"], required: true },
    category: { type: String, default: "" },

    billingAddress: { type: String, default: "" },
    shippingAddress: { type: String, default: "" },
    sameAsBilling: { type: Boolean, default: true },
    state: { type: String, default: "" },
    stateCode: { type: String, default: "" },

    creditPeriod: { type: Number, default: 30 },
    creditLimit: { type: Number, default: 0 },

    contactPersonName: { type: String, default: "" },
    dob: { type: Date, default: null },

    // Party Bank Account (optional)
    bankAccountHolder: { type: String, default: "" },
    bankName: { type: String, default: "" },
    bankAccountNumber: { type: String, default: "" },
    bankIfsc: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);