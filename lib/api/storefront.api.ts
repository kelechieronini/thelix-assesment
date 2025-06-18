import { StorefrontImages } from "../types/storefront.type";
import { api } from "./api.config";

export const _createStoreFrontImages = async (payload: {
  left_image: string;
  right_image: string;
}) => await api.post("/storefront", payload);

export const _getStoreFrontImages = async () =>
  await api.get<StorefrontImages>("/storefront");
