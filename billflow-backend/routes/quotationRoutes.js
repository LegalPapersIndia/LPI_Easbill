import express from "express";
import {
  createQuotation,
  getQuotations,
  getQuotationById,
  deleteQuotation,
} from "../controllers/quotationController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createQuotation);
router.get("/", getQuotations);
router.get("/:id", getQuotationById);
router.delete("/:id", deleteQuotation);

export default router;