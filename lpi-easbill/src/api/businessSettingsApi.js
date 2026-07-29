import axiosInstance from "./axiosInstance";

export const createBusinessSettings = (formData) =>
  axiosInstance.post("/business-settings", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getMyBusinessSettings = () =>
  axiosInstance.get("/business-settings");

export const updateBusinessSettings = (formData) =>
  axiosInstance.put("/business-settings", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });