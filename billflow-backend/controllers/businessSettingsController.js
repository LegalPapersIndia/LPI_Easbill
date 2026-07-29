// import BusinessSettings from "../models/BusinessSettings.js";
// import User from "../models/User.js";
// import { uploadToCloudinary } from "../utils/cloudinary.utils.js";

// // ─────────────────────────────────────────
// // CREATE BUSINESS SETTINGS (Onboarding)
// // ─────────────────────────────────────────
// export const createBusinessSettings = async (req, res) => {
//   try {
//     const existing = await BusinessSettings.findOne({ ownerId: req.userId });
//     if (existing) {
//       return res.status(400).json({
//         success: false,
//         message: "Business Settings already exists for this account",
//       });
//     }

//     const data = { ...req.body, ownerId: req.userId };

//     // ── IMAGE UPLOADS (agar files aayi hain) ──
//     if (req.files?.logo) {
//       const result = await uploadToCloudinary(req.files.logo[0].buffer, "billflow/logo");
//       data.logo = result.secure_url;
//     }
//     if (req.files?.signature) {
//       const result = await uploadToCloudinary(req.files.signature[0].buffer, "billflow/signature");
//       data.signature = result.secure_url;
//     }
//     if (req.files?.paymentQrCode) {
//       const result = await uploadToCloudinary(req.files.paymentQrCode[0].buffer, "billflow/qr");
//       data.paymentQrCode = result.secure_url;
//     }

//     const businessSettings = await BusinessSettings.create(data);

//     // ── USER KE companyId MEIN LINK KARO ──
//     await User.findByIdAndUpdate(req.userId, { companyId: businessSettings._id });

//     res.status(201).json({
//       success: true,
//       message: "Business Settings created successfully",
//       businessSettings,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ─────────────────────────────────────────
// // GET MY BUSINESS SETTINGS
// // ─────────────────────────────────────────
// export const getMyBusinessSettings = async (req, res) => {
//   try {
//     const businessSettings = await BusinessSettings.findOne({ ownerId: req.userId });

//     if (!businessSettings) {
//       return res.status(404).json({
//         success: false,
//         message: "Business Settings not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       businessSettings,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ─────────────────────────────────────────
// // UPDATE BUSINESS SETTINGS
// // ─────────────────────────────────────────
// export const updateBusinessSettings = async (req, res) => {
//   try {
//     const data = { ...req.body };

//     if (req.files?.logo) {
//       const result = await uploadToCloudinary(req.files.logo[0].buffer, "billflow/logo");
//       data.logo = result.secure_url;
//     }
//     if (req.files?.signature) {
//       const result = await uploadToCloudinary(req.files.signature[0].buffer, "billflow/signature");
//       data.signature = result.secure_url;
//     }
//     if (req.files?.paymentQrCode) {
//       const result = await uploadToCloudinary(req.files.paymentQrCode[0].buffer, "billflow/qr");
//       data.paymentQrCode = result.secure_url;
//     }

//     const businessSettings = await BusinessSettings.findOneAndUpdate(
//       { ownerId: req.userId },
//       data,
//       { new: true }
//     );

//     if (!businessSettings) {
//       return res.status(404).json({
//         success: false,
//         message: "Business Settings not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Business Settings updated successfully",
//       businessSettings,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };



import BusinessSettings from "../models/BusinessSettings.js";
import User from "../models/User.js";
import { uploadToCloudinary } from "../utils/cloudinary.utils.js";

// ─────────────────────────────────────────
// CREATE BUSINESS SETTINGS (Onboarding)
// ─────────────────────────────────────────
export const createBusinessSettings = async (req, res) => {
  try {
    const existing = await BusinessSettings.findOne({ ownerId: req.userId });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Business Settings already exists for this account",
      });
    }

    const data = { ...req.body, ownerId: req.userId };

    // ── businessType STRING SE ARRAY MEIN PARSE KARO ──
    if (data.businessType && typeof data.businessType === "string") {
      try {
        data.businessType = JSON.parse(data.businessType);
      } catch {
        data.businessType = [data.businessType];
      }
    }

    // ── IMAGE UPLOADS (agar files aayi hain) ──
    if (req.files?.logo) {
      const result = await uploadToCloudinary(req.files.logo[0].buffer, "billflow/logo");
      data.logo = result.secure_url;
    }
    if (req.files?.signature) {
      const result = await uploadToCloudinary(req.files.signature[0].buffer, "billflow/signature");
      data.signature = result.secure_url;
    }
    if (req.files?.paymentQrCode) {
      const result = await uploadToCloudinary(req.files.paymentQrCode[0].buffer, "billflow/qr");
      data.paymentQrCode = result.secure_url;
    }

    const businessSettings = await BusinessSettings.create(data);

    // ── USER KE companyId MEIN LINK KARO ──
    await User.findByIdAndUpdate(req.userId, { companyId: businessSettings._id });

    res.status(201).json({
      success: true,
      message: "Business Settings created successfully",
      businessSettings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────────
// GET MY BUSINESS SETTINGS
// ─────────────────────────────────────────
export const getMyBusinessSettings = async (req, res) => {
  try {
    const businessSettings = await BusinessSettings.findOne({ ownerId: req.userId });

    if (!businessSettings) {
      return res.status(404).json({
        success: false,
        message: "Business Settings not found",
      });
    }

    res.status(200).json({
      success: true,
      businessSettings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ─────────────────────────────────────────
// UPDATE BUSINESS SETTINGS
// ─────────────────────────────────────────
export const updateBusinessSettings = async (req, res) => {
  try {
    const data = { ...req.body };

    // ── businessType STRING SE ARRAY MEIN PARSE KARO ──
    if (data.businessType && typeof data.businessType === "string") {
      try {
        data.businessType = JSON.parse(data.businessType);
      } catch {
        data.businessType = [data.businessType];
      }
    }

    if (req.files?.logo) {
      const result = await uploadToCloudinary(req.files.logo[0].buffer, "billflow/logo");
      data.logo = result.secure_url;
    }
    if (req.files?.signature) {
      const result = await uploadToCloudinary(req.files.signature[0].buffer, "billflow/signature");
      data.signature = result.secure_url;
    }
    if (req.files?.paymentQrCode) {
      const result = await uploadToCloudinary(req.files.paymentQrCode[0].buffer, "billflow/qr");
      data.paymentQrCode = result.secure_url;
    }

    const businessSettings = await BusinessSettings.findOneAndUpdate(
      { ownerId: req.userId },
      data,
      { new: true }
    );

    if (!businessSettings) {
      return res.status(404).json({
        success: false,
        message: "Business Settings not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Business Settings updated successfully",
      businessSettings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};