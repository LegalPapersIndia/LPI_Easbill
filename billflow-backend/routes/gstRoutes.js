import express from "express";
import { lookupGstin } from "../controllers/gstController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:gstin", authMiddleware, lookupGstin);

export default router;