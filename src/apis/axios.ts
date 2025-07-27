import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://notely-n81l.onrender.com",
  withCredentials: true,
});

export default axiosInstance;
