import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["admin", "accountant", "sales_staff"],
      default: "admin",
    },

    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BusinessSettings",
      default: null,
    },

    // ── REGISTRATION OTP ──
    isPhoneVerified: { type: Boolean, default: false },
    regOtp: { type: String, default: null },
    regOtpExpiry: { type: Date, default: null },

    // ── FORGOT PASSWORD OTP (baad mein use hoga) ──
    resetOtp: { type: String, default: null },
    resetOtpExpiry: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);