import axios from "axios";
import { AppConstants } from "../util/constants";

const api = axios.create({
  baseURL: AppConstants.BACKEND_URL,
  withCredentials: true,
  //   baseURL: "http://localhost:8080/api/v1.0",
});

export const register = ({ name, email, password }) => {
  return api.post(`/register`, { name, email, password });
};

export const login = ({ email, password }) => {
  return api.post(`/login`, { email, password });
};

export const getUserInfo = () => {
  return api.get(`/profile`);
};

export const logout = () => {
  return api.post("/logout");
};
export const sendOtp = () => {
  return api.post("/send-otp");
};
export const verifyOtp = ({ otp }) => {
  return api.post("/verify-otp", { otp });
};
export const getIsAuthenticated = () => {
  return api.get("/is-authenticated");
};
export const sendResetOtp = (email) => {
  return api.post(`/send-reset-otp?email=${email}`);
};

export const resetPassword = ({ email, otp, newPassword }) => {
  return api.post("/reset-password", { email, otp, newPassword });
};
