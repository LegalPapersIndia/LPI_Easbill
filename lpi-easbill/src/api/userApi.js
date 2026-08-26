import axiosInstance from "./axiosInstance";

export const changePassword = (data) => axiosInstance.put("/users/change-password", data);