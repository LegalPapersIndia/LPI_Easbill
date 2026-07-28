// controllers/authController.js

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// ─────────────────────────────────────────
// SEND REGISTRATION OTP (Step 1)
// ─────────────────────────────────────────
export const sendRegistrationOtp = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // ── VALIDATION ──
    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // ── EMAIL FORMAT CHECK ──
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // ── PHONE VALIDATION — 10 digits ──
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number. Must be 10 digits starting with 6-9",
      });
    }

    // ── DUPLICATE CHECK — sirf verified users hi duplicate maano ──
    const existingEmail = await User.findOne({ email, isPhoneVerified: true });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const existingPhone = await User.findOne({ phone, isPhoneVerified: true });
    if (existingPhone) {
      return res.status(400).json({
        success: false,
        message: "Phone number already registered",
      });
    }

    // ── OTP GENERATE ──
    const otp = crypto.randomInt(100000, 999999).toString();

    // ── ABHI SMS API NAHI HAI — TERMINAL PE DIKHAO ──
    console.log("═══════════════════════════════════");
    console.log(" GENERATED OTP:", otp, " | Phone:", phone);
    console.log("═══════════════════════════════════");

    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min

    // ── TEMP STORE — pehle se koi unverified entry hai to update karo, warna naya banao ──
    let tempUser = await User.findOne({ phone, isPhoneVerified: false });

    if (tempUser) {
      tempUser.name = name;
      tempUser.email = email;
      tempUser.password = await bcrypt.hash(password, 10);
      tempUser.regOtp = otp;
      tempUser.regOtpExpiry = otpExpiry;
      await tempUser.save();
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      tempUser = await User.create({
        name,
        email,
        phone,
        password: hashedPassword,
        regOtp: otp,
        regOtpExpiry: otpExpiry,
        isPhoneVerified: false,
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP sent (check terminal for now)",
    });
  } catch (error) {
    console.error("sendRegistrationOtp error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────────
// VERIFY OTP + COMPLETE REGISTRATION (Step 2)
// ─────────────────────────────────────────
export const verifyAndRegister = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        message: "Phone and OTP are required",
      });
    }

    // ── USER DHUNDO ──
    const user = await User.findOne({ phone, isPhoneVerified: false });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No registration found for this number. Please start again.",
      });
    }

    // ── OTP CHECK ──
    if (user.regOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // ── EXPIRY CHECK ──
    if (user.regOtpExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired. Please request a new one.",
      });
    }

    // ── VERIFY + CLEAR OTP ──
    user.isPhoneVerified = true;
    user.regOtp = null;
    user.regOtpExpiry = null;
    await user.save();

    // ── TOKEN ──
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful! Welcome to BillFlow",
      token,
      user,
    });
  } catch (error) {
    console.error("verifyAndRegister error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ─────────────────────────────────────────
// LOGIN USER
// ─────────────────────────────────────────
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email/Phone and password are required",
      });
    }

    // ── EMAIL YA PHONE SE FIND KARO — sirf verified users ──
    const user = await User.findOne({
      $or: [{ email }, { phone: email }],
      isPhoneVerified: true,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email/phone or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email/phone or password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};