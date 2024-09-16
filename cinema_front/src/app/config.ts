import axios from "axios";

export const Axios = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);