import axios from "axios";
import { ImageUpload } from "../types/upload.type";

const baseURL = `https://api.cloudinary.com/v1_1/dnor-dev/image`;

const headers = {
  "Content-Type": "application/x-www-form-urlencoded",
};

const defaultConfig = {
  baseURL,
  headers,
  timeout: 60000,
};

const api = axios.create({ ...defaultConfig });

export const _uploadImage = async (file: File | string) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "food_app");

  return await api.post<ImageUpload>("/upload", formData);
};
