import axios from "axios";

const prodBaseUrl = "https://685221b50594059b23cc6a54.mockapi.io/api/v1";

export const api = axios.create({
  baseURL: prodBaseUrl,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  timeout: 60000,
});

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
    config.headers["Authorization"] = `Bearer `;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
