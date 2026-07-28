import express from "express";
import {
  sendRegistrationOtp,
  verifyAndRegister,
  loginUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/send-otp", sendRegistrationOtp);
router.post("/verify-register", verifyAndRegister);
router.post("/login", loginUser);

export default router;