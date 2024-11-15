"use server";
import { AuthResponseType } from "@/types/auth.type";
import { baseApiAction } from "./baseAction";

export async function registerAction(username: string, fullname: string, email: string, password: string) {
  return baseApiAction<AuthResponseType>(`/auth/register`, {
    method: "POST",
    body: { username, fullname, email, password },
    requiresAuth: false,
  });
}
