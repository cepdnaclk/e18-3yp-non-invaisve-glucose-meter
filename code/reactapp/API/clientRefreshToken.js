import axios from "axios";
import config from "../config";
import AsyncStorage from '@react-native-async-storage/async-storage';

let headers = {};

const axiosInstance = axios.create({
  baseURL: "http://52.221.105.255:3000/api/",
  // baseURL: "http://192.168.1.2:3000/api",
  headers,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("refresh");
    console.log("refresh token is " + token + "\n");
    if (token) {
      config.headers.refresh_token = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
