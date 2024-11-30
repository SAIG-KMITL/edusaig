"use server";
import { CategoryType } from "@/types/category";
import { baseApiAction } from "./baseAction";

export async function fetchCategoriesAction(page?: number, limit?: number, search?: string, slug?: "reward" | "course") {
  return baseApiAction<{ data: CategoryType[] }>(`/category
    ${page || limit || search || slug ? "?" : ""}
    ${page ? `page=${page}` : ""}
    ${limit ? `limit=${limit}` : ""}
    ${search ? `search=${search}` : ""}
    ${slug ? `slug=${slug}` : ""}`, {
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