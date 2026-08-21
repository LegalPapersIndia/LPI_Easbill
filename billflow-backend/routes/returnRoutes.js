import express from "express";
import {
  createReturn,
  getReturns,
  getReturnById,
  deleteReturn,
} from "../controllers/returnController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createReturn);
router.get("/", getReturns);
router.get("/:id", getReturnById);
router.delete("/:id", deleteReturn);

export default router;