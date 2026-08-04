import axiosInstance from "./axiosInstance";

// ── ITEMS ──
export const createItem = (data) => axiosInstance.post("/items", data);
export const getItems = (params) => axiosInstance.get("/items", { params });
export const getItemById = (id) => axiosInstance.get(`/items/${id}`);
export const updateItem = (id, data) => axiosInstance.put(`/items/${id}`, data);
export const deleteItem = (id) => axiosInstance.delete(`/items/${id}`);
export const getItemStats = () => axiosInstance.get("/items/stats");

// ── GROUPS ──
export const getGroups = () => axiosInstance.get("/items/groups");
export const createGroup = (name) => axiosInstance.post("/items/groups", { name });

// ── BRANDS ──
export const getBrands = () => axiosInstance.get("/items/brands");
export const createBrand = (name) => axiosInstance.post("/items/brands", { name });