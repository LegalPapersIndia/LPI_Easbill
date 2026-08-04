import axiosInstance from "./axiosInstance";

export const createPurchaseInvoice = (data) => axiosInstance.post("/purchase-invoice", data);
export const getPurchaseInvoices = (params) => axiosInstance.get("/purchase-invoice", { params });
export const getPurchaseInvoiceById = (id) => axiosInstance.get(`/purchase-invoice/${id}`);
export const deletePurchaseInvoice = (id) => axiosInstance.delete(`/purchase-invoice/${id}`);
export const getPurchaseInvoiceStats = () => axiosInstance.get("/purchase-invoice/stats");