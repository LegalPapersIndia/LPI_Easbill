import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import cloudinaryConnect from "./config/cloudinary.js";
import authRoutes from "./routes/authRoutes.js";
import businessSettingsRoutes from "./routes/businessSettingsRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import salesInvoiceRoutes from "./routes/salesInvoiceRoutes.js";
import purchaseInvoiceRoutes from "./routes/purchaseInvoiceRoutes.js";
import quotationRoutes from "./routes/quotationRoutes.js";
import purchaseOrderRoutes from "./routes/purchaseOrderRoutes.js";
import returnRoutes from "./routes/returnRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();
connectDB();
cloudinaryConnect();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/business-settings", businessSettingsRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/sales-invoice", salesInvoiceRoutes);
app.use("/api/purchase-invoice", purchaseInvoiceRoutes);
app.use("/api/quotation", quotationRoutes);
app.use("/api/purchase-order", purchaseOrderRoutes);
app.use("/api/returns", returnRoutes);
app.use("/api/payments", paymentRoutes);

app.get("/", (req, res) => {
  res.send("BillFlow API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});