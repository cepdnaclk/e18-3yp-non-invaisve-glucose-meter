import axios from "axios";
import config from "../config";
import client2 from "./clientRefreshToken";
import AsyncStorage from '@react-native-async-storage/async-storage';

let headers = {};

const axiosInstance = axios.create({
  baseURL: "http://52.221.105.255:3000/api/",
  // baseURL: "http://192.168.1.2:3000/api",

  headers,
});

async function saveToken(key, val) {
    try {
        await AsyncStorage.setItem(key, val);
    } catch (error) {
        console.log("error storing the auth token");
  }
}

// async function getToken(key) {
//     try {
//         await AsyncStorage.getItem(key);
//     } catch (error) {
//         console.log("error fetching the auth token");
//   }
// }

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("access");
    console.log("access token is " + token + "\n");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const refreshAccessToken = async () => {
  const res = await client2.post("/auth/mobile/refreshtoken", {}).catch((error) => {
    console.log("refreshAccessToken() error: " + error.message + "\n");
  });

  return res.data.access_token;
};

//Add a response interceptor

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    // if (error.response.status === 401 && originalRequest.url ===
    //   'http://192.168.1.2:3000/api/auth/token') {
    //     console.log("____________________________")
    //          router.push('/login');
    //          return Promise.reject(error);
    //      }
    //console.log(originalRequest);

    if (error.response.status === 401 && !originalRequest._retry) {
      console.log('this error occured at ' + originalRequest.url + '\n');
      originalRequest._retry = true;

      const access_token = await refreshAccessToken();
      console.log("new access_token received : " + access_token + "\n");
      saveToken("access", access_token);

      axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
      return axiosInstance(originalRequest);
    }

    // return Error object with Promise
    return Promise.reject(error);
  }
);

export default axiosInstance;
