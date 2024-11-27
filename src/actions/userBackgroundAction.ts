"use server";

import { UserBackgroundResponseType, UserBackgroundsResponseType } from "@/types/userBackground.type";
import { baseApiAction } from "./baseAction";

export async function fetchUserBackgroundsAction() {
  return baseApiAction<UserBackgroundsResponseType>(`/user-background?limit=100`, {
    method: "GET",
    requiresAuth: true,
  });
} 

export async function fetchUserBackgroundAction(id: string) {
  return baseApiAction<UserBackgroundResponseType>(`/user-background/${id}`, {
    method: "GET",
    requiresAuth: true,
  });
} 

export async function createUserBackgroundAction(
  userId: string,
  occupationId: string,
  topics: string[]
) {
  return baseApiAction<UserBackgroundResponseType>(`/user-background`, {
    method: "POST",
    body: { userId, occupationId, topics },
    requiresAuth: true,
  });
} 

export async function updateUserBackgroundAction(
  id: string,
  userId: string,
  occupationId: string,
  topics: string[]
) {
  return baseApiAction<UserBackgroundResponseType>(`/user-background/${id}`, {
    method: "PATCH",
    body: { userId, occupationId, topics },
    requiresAuth: true,
  });
} 

export async function deleteUserBackgroundAction(id: string) {
  return baseApiAction<UserBackgroundResponseType>(`/user-background/${id}`, {
    method: "DELETE",
    requiresAuth: true,
  });
} 