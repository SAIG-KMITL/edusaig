"use server";

import { RewardOptions, RewardResponseType, RewardStatus, RewardType } from "@/types/reward";
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

export async function createRewardAction(
  name: string,
  description: string,
  type: RewardOptions,
  points: number,
  stock: number,
  status: RewardStatus
) {
  return baseApiAction<RewardType>(`/reward`, {
    method: "POST",
    body: { name, description, type, points, stock, status },
    requiresAuth: true,
  });
} 

export async function updateRewardAction(
  id: string,
  name: string,
  description: string,
  type: RewardOptions,
  points: number,
  stock: number,
  status: RewardStatus,
) {
  return baseApiAction<RewardType>(`/reward/${id}`, {
    method: "PATCH",
    body: { name, description, type, points, stock, status },
    requiresAuth: true,
  });
} 

export async function uploadRewardThumbnail(id: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return baseApiAction<void>(`/reward/thumbnail/${id}`, {
    method: "PATCH",
    body: formData,
    requiresAuth: true,
  });
}

export async function deleteRewardAction(id: string) {
  return baseApiAction<RewardType>(`/reward/${id}`, {
    method: "DELETE",
    requiresAuth: true,
  });
} 