import { Meta } from "./meta.type";

export type Category = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
};

export type GetCategoryResponse = {
  data: Category[];
  meta: Meta;
  links: { current: string };
};
