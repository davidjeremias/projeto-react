import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9080/cadcli-backend"
});

api.interceptors.request.use(async config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;