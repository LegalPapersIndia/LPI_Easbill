import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});

export const sendOtp = (data) => API.post("/send-otp", data);
export const verifyRegister = (data) => API.post("/verify-register", data);
export const loginUser = (data) => API.post("/login", data);