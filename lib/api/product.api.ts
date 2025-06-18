import { AddProductSchema } from "../schema/add-product.schema";
import { ProductImageFile } from "../types/product-image.type";
import { GetProductResponseType, Product } from "../types/product.type";
import { ProductQuery } from "../types/query.type";
import { api } from "./api.config";
import { _uploadImage } from "./media.api";

export const _getProducts = async (
  page: number,
  limit?: number,
  query?: ProductQuery
) =>
  await api.get<GetProductResponseType>(
    `/product?search=${query?.search ?? ""}${query?.status ? `&filter.status=$eq:${query?.status}` : ""}${query?.category ? `&filter.category.name=$eq:${query?.category.toLowerCase()}` : ""}&page=${page}&limit=${limit ?? 10}`
  );

export const _getProduct = async (id: string) =>
  await api.get<Product>(`/product/${id}`);

export const _addProduct = async (payload: {
  data: AddProductSchema;
  selectedFiles: ProductImageFile[];
  status: string;
}) => {
  const imageFiles = payload.selectedFiles.map((f) => f.file);

  const imageUploadResponses = await Promise.all(
    imageFiles.map((file) => _uploadImage(file))
  );

  const images = imageUploadResponses.map((image) => image.data.secure_url);

  return await api.post("/product", {
    ...payload.data,
    tags: payload.data.tags.split(","),
    image: images[0],
    images,
    status: payload.status,
  });
};

export const _editProduct = async (payload: {
  data: AddProductSchema;
  images: string[];
  selectedFiles: ProductImageFile[];
  status: string;
  productID: string;
}) => {
  const imageFiles = payload.selectedFiles.map((f) => f.file);

  if (imageFiles.length > 0) {
    const imageUploadResponses = await Promise.all(
      imageFiles.map((file) => _uploadImage(file))
    );
    const newImages = imageUploadResponses.map(
      (image) => image.data.secure_url
    );
    payload.images = payload.images.concat(newImages);
  }

  return await api.patch<Product>(`/product/${payload.productID}`, {
    ...payload.data,
    tags: payload.data.tags.split(","),
    image: payload.images[0],
    images: payload.images,
    status: payload.status,
  });
};

export const _deleteProduct = async (productID: string) =>
  await api.delete(`/product/${productID}`);

export const _changeProductStatus = async (payload: {
  productID: string;
  status: string;
}) =>
  await api.patch<Product>(`/product/${payload.productID}`, {
    status: payload.status,
  });
