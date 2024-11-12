import { UserResponseType } from "@/types/user.type";
import { baseApiAction } from "./baseAction";

export async function fetchUserAction() {
  return baseApiAction<UserResponseType>(`/user/profile`, {
    method: "GET",
    requiresAuth: true,
  });
}
