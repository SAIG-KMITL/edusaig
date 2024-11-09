"use server";
import { baseApiAction } from "./baseAction";
import { AuthResponseType } from "@/app/types/auth.type";

export async function loginAction(email: string, password: string) {
  return baseApiAction<AuthResponseType>(`/auth/login`, {
    method: "POST",
    body: { email, password },
    requiresAuth: false,
  });
}
