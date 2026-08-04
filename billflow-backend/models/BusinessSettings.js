// import mongoose from "mongoose";

// const businessSettingsSchema = new mongoose.Schema(
//   {
//     ownerId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       unique: true,
//     },

//     businessName: { type: String, required: true },
//     logo: { type: String, default: "" },

//     phone: { type: String, default: "" },
//     email: { type: String, default: "" },

//     billingAddress: { type: String, default: "" },
//     state: { type: String, default: "" },
//     pincode: { type: String, default: "" },
//     city: { type: String, default: "" },

//     isGstRegistered: { type: Boolean, default: false },
//     gstin: { type: String, default: "" },

//     businessType: { type: [String], default: [] },
//     industryType: { type: String, default: "" },
//     registrationType: { type: String, default: "" },
//     panNumber: { type: String, default: "" },

//     accountHolderName: { type: String, default: "" },
//     bankName: { type: String, default: "" },
//     accountNumber: { type: String, default: "" },
//     ifscCode: { type: String, default: "" },
//     branchName: { type: String, default: "" },
//     paymentQrCode: { type: String, default: "" },

//     signature: { type: String, default: "" },

//     invoicePrefix: { type: String, default: "INV" },
//     invoiceStartNumber: { type: Number, default: 1 },
//     defaultTerms: { type: String, default: "" },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("BusinessSettings", businessSettingsSchema);


import mongoose from "mongoose";

const businessSettingsSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    businessName: { type: String, required: true },
    logo: { type: String, default: "" },

    phone: { type: String, default: "" },
    email: { type: String, default: "" },

    billingAddress: { type: String, default: "" },
    state: { type: String, default: "" },
    pincode: { type: String, default: "" },
    city: { type: String, default: "" },

    isGstRegistered: { type: Boolean, default: false },
    gstin: { type: String, default: "" },

    businessType: { type: [String], default: [] },
    industryType: { type: String, default: "" },
    registrationType: { type: String, default: "" },
    panNumber: { type: String, default: "" },

    accountHolderName: { type: String, default: "" },
    bankName: { type: String, default: "" },
    accountNumber: { type: String, default: "" },
    ifscCode: { type: String, default: "" },
    branchName: { type: String, default: "" },
    paymentQrCode: { type: String, default: "" },

    signature: { type: String, default: "" },

    invoicePrefix: { type: String, default: "INV" },
    invoiceStartNumber: { type: Number, default: 1 },
    defaultTerms: { type: String, default: "" },

    invoiceTemplate: {
      type: String,
      enum: ["Standard", "Colorful", "Elegant"],
      default: "Standard",
    },


    isSetupComplete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("BusinessSettings", businessSettingsSchema);