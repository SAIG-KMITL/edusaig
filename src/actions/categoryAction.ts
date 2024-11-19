"use server";
import { CategoryType } from "@/types/category";
import { baseApiAction } from "./baseAction";

export async function fetchCategoriesAction() {
  return baseApiAction<CategoryType[]>("/category", {
    method: "GET",
    requiresAuth: false,
  });
}

export async function fetchCategoryAction(id: string) {
  return baseApiAction<CategoryType>(`/category/${id}`, {
    method: "GET",
    requiresAuth: false,
  });
}

export async function createCategoryAction(
  title: string,
  description: string,
  slug: string,
) {
  return baseApiAction<CategoryType>(`/category`, {
    method: "POST",
    body: { title, description, slug },
    requiresAuth: true,
  });
}

export async function editCategoryAction(
  id: string,
  title: string,
  description: string,
  slug: string,
) {
  return baseApiAction<CategoryType>(`/category/${id}`, {
    method: "PATCH",
    body: { title, description, slug },
    requiresAuth: true,
  });
}

export async function deleteCategoryAction(id: string) {
  return baseApiAction<null>(`/category/${id}`, {
    method: "DELETE",
    requiresAuth: true,
  });
}