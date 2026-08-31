
// import express from "express";
// import { adminLogin, getAllBusinesses, deleteUser } from "../controllers/adminController.js";
// import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";

// const router = express.Router();

// router.post("/login", adminLogin);
// router.get("/businesses", adminAuthMiddleware, getAllBusinesses);
// router.delete("/users/:id", adminAuthMiddleware, deleteUser);

// export default router;



import express from "express";
import { adminLogin, getAllBusinesses, getStats, deleteUser } from "../controllers/adminController.js";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/businesses", adminAuthMiddleware, getAllBusinesses);
router.get("/stats", adminAuthMiddleware, getStats);
router.delete("/users/:id", adminAuthMiddleware, deleteUser);

export default router;