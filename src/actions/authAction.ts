"use server";
import { AuthResponseType } from "@/types/auth.type";
import { baseApiAction } from "./baseAction";

export async function loginAction(email: string, password: string) {
  return baseApiAction<AuthResponseType>(`/auth/login`, {
    method: "POST",
    body: { email, password },
    requiresAuth: false,
  });
}