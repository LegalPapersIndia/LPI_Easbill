import express from "express";
import {
  createPayment,
  getPayments,
  deletePayment,
  getPendingInvoices,
} from "../controllers/paymentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/pending-invoices", getPendingInvoices);
router.post("/", createPayment);
router.get("/", getPayments);
router.delete("/:id", deletePayment);

export default router;