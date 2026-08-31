

// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// import BusinessSettings from "../models/BusinessSettings.js";

// // ─────────────────────────────────────────
// // ADMIN LOGIN (hardcoded credentials from .env)
// // ─────────────────────────────────────────
// export const adminLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Email and password are required",
//       });
//     }

//     // ── HARDCODED ADMIN CREDENTIALS CHECK ──
//     if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid admin credentials",
//       });
//     }

//     // ── TOKEN — isAdmin flag se normal user token se differentiate hota hai ──
//     const token = jwt.sign({ isAdmin: true }, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Admin login successful",
//       token,
//     });
//   } catch (error) {
//     console.error("adminLogin error:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ─────────────────────────────────────────
// // GET ALL REGISTERED BUSINESSES (full BusinessSettings bhi saath)
// // ─────────────────────────────────────────
// export const getAllBusinesses = async (req, res) => {
//   try {
//     const users = await User.find()
//       .select("name email phone createdAt companyId")
//       .populate("companyId") // ── poori BusinessSettings details bhi saath aayengi ──
//       .sort({ createdAt: -1 });

//     return res.status(200).json({
//       success: true,
//       count: users.length,
//       users,
//     });
//   } catch (error) {
//     console.error("getAllBusinesses error:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ─────────────────────────────────────────
// // DELETE USER (+ uski BusinessSettings bhi)
// // ─────────────────────────────────────────
// export const deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // ── User ki BusinessSettings bhi delete karo, agar hai ──
//     if (user.companyId) {
//       await BusinessSettings.findByIdAndDelete(user.companyId);
//     }

//     await User.findByIdAndDelete(id);

//     return res.status(200).json({
//       success: true,
//       message: "User aur unki business details delete ho gayi",
//     });
//   } catch (error) {
//     console.error("deleteUser error:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };



import jwt from "jsonwebtoken";
import User from "../models/User.js";
import BusinessSettings from "../models/BusinessSettings.js";

// ─────────────────────────────────────────
// ADMIN LOGIN (hardcoded credentials from .env)
// ─────────────────────────────────────────
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // ── HARDCODED ADMIN CREDENTIALS CHECK ──
    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.status(400).json({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    // ── TOKEN — isAdmin flag se normal user token se differentiate hota hai ──
    const token = jwt.sign({ isAdmin: true }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      token,
    });
  } catch (error) {
    console.error("adminLogin error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────────
// GET ALL REGISTERED BUSINESSES (full BusinessSettings bhi saath)
// ─────────────────────────────────────────
export const getAllBusinesses = async (req, res) => {
  try {
    const users = await User.find()
      .select("name email phone createdAt companyId")
      .populate("companyId") // ── poori BusinessSettings details bhi saath aayengi ──
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("getAllBusinesses error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────────
// GET DASHBOARD STATS (cards ke liye)
// ─────────────────────────────────────────
export const getStats = async (req, res) => {
  try {
    // ── TOTAL REGISTERED BUSINESSES ──
    const totalBusinesses = await User.countDocuments();

    // ── NEW THIS MONTH — current calendar month ke start se ab tak ──
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const newThisMonth = await User.countDocuments({ createdAt: { $gte: startOfMonth } });

    // ── SETUP COMPLETE vs INCOMPLETE ──
    const setupComplete = await BusinessSettings.countDocuments({ isSetupComplete: true });
    const setupIncomplete = totalBusinesses - setupComplete;

    // ── GST REGISTERED COUNT ──
    const gstRegistered = await BusinessSettings.countDocuments({ isGstRegistered: true });

    return res.status(200).json({
      success: true,
      stats: {
        totalBusinesses,
        newThisMonth,
        setupComplete,
        setupIncomplete,
        gstRegistered,
      },
    });
  } catch (error) {
    console.error("getStats error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────────
// DELETE USER (+ uski BusinessSettings bhi)
// ─────────────────────────────────────────
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ── User ki BusinessSettings bhi delete karo, agar hai ──
    if (user.companyId) {
      await BusinessSettings.findByIdAndDelete(user.companyId);
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "User aur unki business details delete ho gayi",
    });
  } catch (error) {
    console.error("deleteUser error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};