import { getAccessToken } from "@/lib/utils";
import axios from "axios";

const prodBaseUrl = "https://api.attirealley.ng/api/v1";
// const localBaseUrl = "http://localhost:5000/api/v1";

const headers = {
  "Access-Control-Allow-Origin": true,
  "Access-Control-Allow-Credentials": "include",
  "Content-Type": "application/json; charset=utf-8",
};

export const api = axios.create({
  baseURL: prodBaseUrl,
  headers,
  timeout: 60000,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${getAccessToken()}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const uploadHeaders = {
  "Access-Control-Allow-Origin": true,
  "Access-Control-Allow-Credentials": "include",
  "Content-Type": "multipart/form-data",
};

export const uploadApi = axios.create({
  baseURL: prodBaseUrl,
  headers: uploadHeaders,
  timeout: 60000,
  withCredentials: true,
});

uploadApi.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${getAccessToken()}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
