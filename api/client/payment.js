import axios from "axios";
import { deleteToken } from "../../utils/auth";

const api = axios.create({
  // baseURL: 'https://jsonplaceholder.typicode.com/',
  baseURL: "http://localhost:2300/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // optional timeout
});

// Optional: Add interceptors for auth, logging, errors
api.interceptors.request.use(
  (config) => {
    // For example, attach auth token here
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },

  (error) => {
    console.log("err1: ", error)
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // console.log("error: ", error.response?.status)

    if (error.response?.status === 401) {
      const message = error.response?.data?.message;
      if (message === "Token expired") {
        deleteToken();
        window.location.href = "/";
      }
    }
    // window.location.href = "/login";
    return Promise.reject(error);
  }
);

export default api;
