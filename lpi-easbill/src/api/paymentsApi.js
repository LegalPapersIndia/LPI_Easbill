import axiosInstance from "./axiosInstance";

export const createPayment = (data) => axiosInstance.post("/payments", data);
export const getPayments = (params) => axiosInstance.get("/payments", { params });
export const deletePayment = (id) => axiosInstance.delete(`/payments/${id}`);
export const getPendingInvoices = (partyId, type) =>
  axiosInstance.get("/payments/pending-invoices", { params: { partyId, type } });
