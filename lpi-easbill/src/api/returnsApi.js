import axiosInstance from "./axiosInstance";

export const createReturn = (data) => axiosInstance.post("/returns", data);
export const getReturns = (params) => axiosInstance.get("/returns", { params });
export const getReturnById = (id) => axiosInstance.get(`/returns/${id}`);
export const deleteReturn = (id) => axiosInstance.delete(`/returns/${id}`);