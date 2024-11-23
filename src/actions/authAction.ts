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

export async function registerAction(
  username: string,
  fullname: string,
  email: string,
  password: string,
  role: string
) {
  return baseApiAction<AuthResponseType>(`/auth/register`, {
    method: "POST",
    body: { username, fullname, email, password,role },
    requiresAuth: false,
  });
}
