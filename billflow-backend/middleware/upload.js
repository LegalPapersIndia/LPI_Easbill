// middleware/upload.js

import multer from "multer";

// ─────────────────────────────────────────
// MEMORY STORAGE
// Buffer seedha Cloudinary ko jayega
// Disk pe kuch save nahi hoga
// ─────────────────────────────────────────
const storage = multer.memoryStorage();

const upload = multer({
  storage,

  // MAX 5MB PER IMAGE
  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  // ALLOWED FORMATS
  fileFilter: (req, file, cb) => {
    const allowed = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, PNG, WebP allowed"), false);
    }
  },
});

// ─────────────────────────────────────────
// BUSINESS SETTINGS — 3 IMAGES EK SAATH
// logo + signature + paymentQrCode
// ─────────────────────────────────────────
export const uploadBusinessImages = upload.fields([
  { name: "logo", maxCount: 1 },
  { name: "signature", maxCount: 1 },
  { name: "paymentQrCode", maxCount: 1 },
]);

export default upload;