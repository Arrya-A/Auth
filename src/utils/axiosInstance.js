import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  baseURL:import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;
