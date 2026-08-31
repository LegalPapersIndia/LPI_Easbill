
// import axiosInstance from "./axiosInstance";

// export const adminLogin = (data) => axiosInstance.post("/admin/login", data);
// export const getAllBusinesses = () => axiosInstance.get("/admin/businesses");
// export const deleteUser = (id) => axiosInstance.delete(`/admin/users/${id}`);


import axiosInstance from "./axiosInstance";

export const adminLogin = (data) => axiosInstance.post("/admin/login", data);
export const getAllBusinesses = () => axiosInstance.get("/admin/businesses");
export const getStats = () => axiosInstance.get("/admin/stats");
export const deleteUser = (id) => axiosInstance.delete(`/admin/users/${id}`);