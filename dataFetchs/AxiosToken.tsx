import axios from "axios";

export const axiosUser = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/`,
});

axiosUser.interceptors.request.use((config) => {
  const token = localStorage.getItem("SamiDzma-User");
  config.headers.Authorization = token && `Bearer ${token}`;
  return config;
});

export const axiosAdmin = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/`,
});

axiosAdmin.interceptors.request.use((config) => {
  const token = localStorage.getItem("SamiDzma-Admin");
  config.headers.Authorization = token && `Bearer ${token}`;
  return config;
});
