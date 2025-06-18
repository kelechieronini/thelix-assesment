import { Category } from "./category.type";
import { Meta } from "./meta.type";

export type Product = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  price: number;
  slug: string;
  description: string;
  tags: string[];
  image: string;
  images: string[];
  waist: number;
  length: number;
  weight: number;
  size: string;
  rating: number;
  status: string;
  quantity_in_stock: number;
  category: Category;
};

export type GetProductResponseType = {
  data: Product[];
  meta: Meta;
  links: {
    current: string;
  };
};
