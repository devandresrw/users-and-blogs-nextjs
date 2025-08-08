import axios from 'axios';

const axiosInstance = axios.create({
 baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000', // ✅ Sin /api
 headers: {
  'Content-Type': 'application/json',
 },
 timeout: 10000,
});

// Interceptors para manejar errores
axiosInstance.interceptors.response.use(
 (response) => response,
 (error) => {
  console.error('API Error:', error.response?.data || error.message);
  return Promise.reject(error);
 }
);

export default axiosInstance;