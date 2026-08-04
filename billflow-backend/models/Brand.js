import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BusinessSettings",
      required: true,
    },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Brand", brandSchema);