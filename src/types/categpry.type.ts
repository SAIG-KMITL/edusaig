import { MetaType } from "./meta.type";

export type CategoryType = {
  id: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

export type CategoriesResponseType = {
  data: CategoryType[];
  meta: MetaType;
};