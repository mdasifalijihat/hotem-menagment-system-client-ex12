import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://hostel-management-server-zeta.vercel.app/",
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
