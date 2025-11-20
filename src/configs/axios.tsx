// api/axiosClient.js
import { notification } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  config.headers.Authorization = `Bearer ${Cookies.get("token")}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },

  async (error) => {
    if (error && error?.response?.status === 401) {
      await Cookies.remove("token");
      // await notification.warning({
      //   message: "",
      //   description: <b>Xin đăng nhập.</b>,
      //   key: "Xin đăng nhập.",
      // });
    }

    throw error;
  }
);

export default axiosClient;
