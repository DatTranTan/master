import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import queryString from "query-string";

// -------------------------------------------
// Tạo axios instance
// -------------------------------------------
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

// -------------------------------------------
// Request interceptor
// -------------------------------------------
axiosClient.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// -------------------------------------------
// Response interceptor (TRẢ VỀ JSON THUẦN)
// -------------------------------------------
// Đây là phần QUAN TRỌNG – khai báo generic để TS hiểu
// axiosClient.post<T>() sẽ TRẢ RA T LUÔN
// -------------------------------------------
axiosClient.interceptors.response.use(
  <T,>(response: AxiosResponse<T>): T => {
    return response.data; // JSON thuần
  },

  async (error) => {
    if (error?.response?.status === 401) {
      await Cookies.remove("token");
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
