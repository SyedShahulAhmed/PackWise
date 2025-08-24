// One axios instance, one base URL, auto-attach token
import axios from "axios";

const API_BASE =
  import.meta?.env?.VITE_API_BASE || process.env.REACT_APP_API_BASE || "http://localhost:5000";

export const api = axios.create({
  baseURL: API_BASE,          // e.g. http://localhost:5000
  withCredentials: false,     // set true only if using cookies for auth
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
