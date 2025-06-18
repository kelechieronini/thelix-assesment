import { GetCategoryResponse } from "../types/category.type";
import { api } from "./api.config";

export const _getCategories = async () =>
  await api.get<GetCategoryResponse>("/category?limit=100");
