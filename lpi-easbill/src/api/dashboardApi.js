// import axiosInstance from "./axiosInstance";

// export const getDashboardData = () => axiosInstance.get("/dashboard");


import axiosInstance from "./axiosInstance";

export const getDashboardData = () => axiosInstance.get("/dashboard");

export const getSalesTrend = (range) =>
  axiosInstance.get("/dashboard/sales-trend", { params: { range } });