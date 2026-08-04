import express from "express";
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
  getItemStats,
  getGroups,
  createGroup,
  getBrands,
  createBrand,
} from "../controllers/itemController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

// Groups & Brands (inline-add ke liye, Items se pehle route karna zaroori hai)
router.get("/groups", getGroups);
router.post("/groups", createGroup);
router.get("/brands", getBrands);
router.post("/brands", createBrand);

router.get("/stats", getItemStats);
router.post("/", createItem);
router.get("/", getItems);
router.get("/:id", getItemById);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

export default router;