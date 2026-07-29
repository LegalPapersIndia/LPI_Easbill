import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import cloudinaryConnect from "./config/cloudinary.js";
import authRoutes from "./routes/authRoutes.js";
import businessSettingsRoutes from "./routes/businessSettingsRoutes.js";

dotenv.config();
connectDB();
cloudinaryConnect();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/business-settings", businessSettingsRoutes);

app.get("/", (req, res) => {
  res.send("BillFlow API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});