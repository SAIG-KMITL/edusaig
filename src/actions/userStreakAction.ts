import { UserStreakType } from "@/types/pointStreak.type";
import { baseApiAction } from "./baseAction";


export async function fetchUserStreakAction() {
  return baseApiAction<UserStreakType[]>("/user-streak/profile", {
    method: "GET",
    requiresAuth: true,
  });
}

export async function createUserStreakAction() {
  return baseApiAction<UserStreakType>("/user-streak", {
    method: "POST",
    requiresAuth: true,
  });
}