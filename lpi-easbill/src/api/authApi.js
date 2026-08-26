

// import axiosInstance from "./axiosInstance";

// export const sendOtp = (data) => axiosInstance.post("/auth/send-otp", data);
// export const verifyRegister = (data) => axiosInstance.post("/auth/verify-register", data);
// export const loginUser = (data) => axiosInstance.post("/auth/login", data);




import axiosInstance from "./axiosInstance";

export const registerUser = (data) => axiosInstance.post("/auth/register", data);
export const loginUser = (data) => axiosInstance.post("/auth/login", data);