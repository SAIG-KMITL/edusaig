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
  userName: string,
  fullname: string,
  email: string,
  password: string
) {
  return baseApiAction<AuthResponseType>(`/auth/register`, {
    method: "POST",
    body: { userName, fullname, email, password },
    requiresAuth: false,
  });
}
