"use server";
import { AuthResponseType } from "@/types/auth.type";
import { baseApiAction } from "./baseAction";

export async function createCategoryAction(
    title: string, 
    description: string, 
    slug: string,
) {
  return baseApiAction<AuthResponseType>(`/form/create-category`, {
    method: "POST",
    body: { title, description, slug },
    requiresAuth: true,
  });
}

export async function editCategoryAction(
  title: string, 
  description: string, 
  slug: string,
) {
return baseApiAction<AuthResponseType>(`/form/edit-category/`, {
  method: "POST",
  body: { title, description, slug },
  requiresAuth: true,
});
}