// utils/cloudinary.utils.js

import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

// ─────────────────────────────────────────
// UPLOAD — buffer ko Cloudinary pe bhejo
// ─────────────────────────────────────────
export const uploadToCloudinary = (fileBuffer, folder = "billflow") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        transformation: [
          { width: 1000, crop: "limit" },
          { quality: "auto" },
          { fetch_format: "auto" },
        ],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// ─────────────────────────────────────────
// DELETE — Cloudinary se image hatao
// ─────────────────────────────────────────
export const deleteFromCloudinary = async (public_id) => {
  return await cloudinary.uploader.destroy(public_id);
};