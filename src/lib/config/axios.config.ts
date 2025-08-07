import axios from "axios";

const axiosInstance = axios.create({
 baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
 timeout: 10000,
 headers: {
  "Content-Type": "application/json",
 },
});

// Interceptor para agregar el token de autenticación si existe
axiosInstance.interceptors.request.use(
 (config) => {
  if (typeof window !== "undefined") {
   const token = localStorage.getItem("auth_token");
   if (token) {
    config.headers.Authorization = `Bearer ${token}`;
   }
  }
  return config;
 },
 (error) => Promise.reject(error)
);

export default axiosInstance;