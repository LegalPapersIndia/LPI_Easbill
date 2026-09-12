import axiosInstance from "./axiosInstance";

export const lookupGstin = (gstin) => axiosInstance.get(`/gst/${gstin}`);