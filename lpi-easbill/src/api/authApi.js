// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api/auth",
// });

// export const sendOtp = (data) => API.post("/send-otp", data);
// export const verifyRegister = (data) => API.post("/verify-register", data);
// export const loginUser = (data) => API.post("/login", data);



import axiosInstance from "./axiosInstance";

export const sendOtp = (data) => axiosInstance.post("/auth/send-otp", data);
export const verifyRegister = (data) => axiosInstance.post("/auth/verify-register", data);
export const loginUser = (data) => axiosInstance.post("/auth/login", data);