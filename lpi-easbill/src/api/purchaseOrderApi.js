import axiosInstance from "./axiosInstance";

export const createPurchaseOrder = (data) => axiosInstance.post("/purchase-order", data);
export const getPurchaseOrders = (params) => axiosInstance.get("/purchase-order", { params });
export const getPurchaseOrderById = (id) => axiosInstance.get(`/purchase-order/${id}`);
export const deletePurchaseOrder = (id) => axiosInstance.delete(`/purchase-order/${id}`);