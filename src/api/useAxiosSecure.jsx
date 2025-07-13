import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

// Automatically attach admin token to secure requests
axiosSecure.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
