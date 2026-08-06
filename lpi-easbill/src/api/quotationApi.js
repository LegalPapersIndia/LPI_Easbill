import axiosInstance from "./axiosInstance";

export const createQuotation = (data) => axiosInstance.post("/quotation", data);
export const getQuotations = (params) => axiosInstance.get("/quotation", { params });
export const getQuotationById = (id) => axiosInstance.get(`/quotation/${id}`);
export const deleteQuotation = (id) => axiosInstance.delete(`/quotation/${id}`);