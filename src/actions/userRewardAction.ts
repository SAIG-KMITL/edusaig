import { UserRewardType } from "@/types/reward";
import { baseApiAction } from "./baseAction";

export async function fetchUserRewardAction() {
  return baseApiAction<UserRewardType[]>("/user-reward/user", {
    method: "GET",
    requiresAuth: true,
  });
}

export async function createUserRewardAction(rewardId: string) {
  return baseApiAction<UserRewardType>(`/user-reward/${rewardId}`, {
    method: "POST",
    requiresAuth: true,
  });
}