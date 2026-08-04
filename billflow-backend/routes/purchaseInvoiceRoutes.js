import express from "express";
import {
  createPurchaseInvoice,
  getPurchaseInvoices,
  getPurchaseInvoiceById,
  getPurchaseInvoiceStats,
  deletePurchaseInvoice,
} from "../controllers/purchaseInvoiceController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/stats", getPurchaseInvoiceStats);
router.post("/", createPurchaseInvoice);
router.get("/", getPurchaseInvoices);
router.get("/:id", getPurchaseInvoiceById);
router.delete("/:id", deletePurchaseInvoice);

export default router;