import api from "../axios";
import API_ROUTE from "../endpoints";

export const checkApiRequest = () =>
  api.get(API_ROUTE.user.checkapi);

export const loginRequest = (data) =>
  api.post(API_ROUTE.user.login, data, { withCredentials: true });

export const verifyUserRequest = () =>
  api.get("/auth/verify", { withCredentials: true });

export const logoutRequest = () =>
  api.post("/auth/logout", {}, { withCredentials: true });

export const signUpRequest = (formData) =>
  api.post(API_ROUTE.user.signUp, formData);

export const sendOtpRequest = (data) =>
  api.post(API_ROUTE.user.sendOtp, data);

export const submitOtpRequest = (data) =>
  api.post(API_ROUTE.user.submitOtp, data);

export const changePasswordRequest = (data) =>
  api.put(API_ROUTE.user.changePasword, data);

