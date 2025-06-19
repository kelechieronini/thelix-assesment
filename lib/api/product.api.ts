import { AddProductSchema } from "../schema/add-product.schema";
import { ProductImageFile } from "../types/product-image.type";
import { Product } from "../types/product.type";
import { ProductQuery } from "../types/query.type";
import { api } from "./api.config";
import { _uploadImage } from "./media.api";

//get all products api
export const _getProducts = async (
  page: number,
  limit?: number,
  query?: ProductQuery
) =>
  await api.get<Product[]>(
    `/products?name=${query?.name ?? ""}${query?.category ? `&category=${query?.category}` : ""}&page=${page}&limit=${limit ?? 10}&order=desc`
  );

//add product api
export const _addProduct = async (payload: {
  data: AddProductSchema;
  selectedFiles: ProductImageFile[];
}) => {
  const imageFiles = payload.selectedFiles.map((f) => f.file);

  const imageUploadResponses = await Promise.all(
    imageFiles.map((file) => _uploadImage(file))
  );

  const images = imageUploadResponses.map((image) => image.data.secure_url);

  return await api.post("/products", {
    ...payload.data,
    image: images[0],
  });
};
