// import express from "express";
// import { getDashboardData } from "../controllers/dashboardController.js";
// import authMiddleware from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.get("/", authMiddleware, getDashboardData);

// export default router;


import express from "express";
import { getDashboardData, getSalesTrend } from "../controllers/dashboardController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getDashboardData);
router.get("/sales-trend", authMiddleware, getSalesTrend); // ← naya route

export default router;