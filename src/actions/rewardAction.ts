import { RewardOptions, RewardResponseType, RewardType } from "@/types/reward";
import { baseApiAction } from "./baseAction";


export async function fetchRewardsAction(page: number = 1, limit: number = 9, search?: string, type?: RewardOptions) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (search) params.append("search", search);
  if (type) params.append("type", type);

  const queryString = `?${params.toString()}`;

  return baseApiAction<RewardResponseType>(`/reward${queryString}`, {
    method: "GET",
    requiresAuth: true,
  });
}

export async function fetchRewardAction(id: string) {
  return baseApiAction<RewardType>(`/reward/${id}`, {
    method: "GET",
    requiresAuth: true,
  });
}