import express from "express";
import {
  createBusinessSettings,
  getMyBusinessSettings,
  updateBusinessSettings,
} from "../controllers/businessSettingsController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { uploadBusinessImages } from "../middleware/upload.js";

const router = express.Router();

router.post("/", authMiddleware, uploadBusinessImages, createBusinessSettings);
router.get("/", authMiddleware, getMyBusinessSettings);
router.put("/", authMiddleware, uploadBusinessImages, updateBusinessSettings);

export default router;