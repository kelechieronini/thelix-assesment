import axios from "axios";
import { ImageUpload } from "../types/upload.type";

//api endpoint and configuration setup for cloudinary image upload

const baseURL = `https://api.cloudinary.com/v1_1/kelechieronini/image`;

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
  formData.append("upload_preset", "pictures");

  return await api.post<ImageUpload>("/upload", formData);
};
