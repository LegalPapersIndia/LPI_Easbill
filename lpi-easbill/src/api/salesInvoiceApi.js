import axiosInstance from "./axiosInstance";

export const createSalesInvoice = (data) => axiosInstance.post("/sales-invoice", data);
export const getSalesInvoices = (params) => axiosInstance.get("/sales-invoice", { params });
export const getSalesInvoiceById = (id) => axiosInstance.get(`/sales-invoice/${id}`);
export const deleteSalesInvoice = (id) => axiosInstance.delete(`/sales-invoice/${id}`);
export const getSalesInvoiceStats = () => axiosInstance.get("/sales-invoice/stats");