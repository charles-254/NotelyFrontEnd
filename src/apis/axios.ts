import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:3000",
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
