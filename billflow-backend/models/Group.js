import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
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

export default mongoose.model("Group", groupSchema);