import axios from "axios";

// Central axios instance used across the app
const api = axios.create({
  // live database
  // baseURL: 'https://iccdinternalsystemserver.matzsolutions.com',
  baseURL: "http://localhost:22306",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Attach bearer token from localStorage on each request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle common authentication errors in one place
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    if (status === 401 && message === "Token expired") {
      // Clear token and force a fresh login
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
