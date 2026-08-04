import express from "express";
import {
  createSalesInvoice,
  getSalesInvoices,
  getSalesInvoiceById,
  getSalesInvoiceStats,
  deleteSalesInvoice,
} from "../controllers/salesInvoiceController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/stats", getSalesInvoiceStats);
router.post("/", createSalesInvoice);
router.get("/", getSalesInvoices);
router.get("/:id", getSalesInvoiceById);
router.delete("/:id", deleteSalesInvoice);

export default router;