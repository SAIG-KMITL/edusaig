"use server";

import { baseApiAction } from "./baseAction";
import { UserOccupationResponseType, UserOccupationsResponseType } from "@/types/userOccupation.type";

export async function fetchUserOccupationsAction() {
  return baseApiAction<UserOccupationsResponseType>(`/user-occupation?limit=100`, {
    method: "GET",
    requiresAuth: true,
  });
} 

export async function fetchUserOccupationAction(id: string) {
  return baseApiAction<UserOccupationResponseType>(`/user-occupation/${id}`, {
    method: "GET",
    requiresAuth: true,
  });
} 

export async function createUserOccupationAction(
  title: string,
  description: string,
) {
  return baseApiAction<UserOccupationResponseType>(`/user-occupation`, {
    method: "POST",
    body: { title, description },
    requiresAuth: true,
  });
} 

export async function updateUserOccupationAction(
  id: string,
  title: string,
  description: string,
) {
  return baseApiAction<UserOccupationResponseType>(`/user-occupation/${id}`, {
    method: "PATCH",
    body: { title, description },
    requiresAuth: true,
  });
} 

export async function deleteUserOccupationAction(id: string) {
  return baseApiAction<UserOccupationResponseType>(`/user-occupation/${id}`, {
    method: "DELETE",
    requiresAuth: true,
  });
} 