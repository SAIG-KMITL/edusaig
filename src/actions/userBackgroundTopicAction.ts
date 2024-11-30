"use server";

import { UserBackgroundTopicResponseType, UserBackgroundTopicsResponseType } from "@/types/userBackgroundTopic.type";
import { baseApiAction } from "./baseAction";

export async function fetchUserBackgroundTopicsAction() {
  return baseApiAction<UserBackgroundTopicsResponseType>(`/user-background-topic?limit=100`, {
    method: "GET",
    requiresAuth: true,
  });
} 

export async function fetchUserBackgroundTopicAction(id: string) {
  return baseApiAction<UserBackgroundTopicResponseType>(`/user-background-topic/${id}`, {
    method: "GET",
    requiresAuth: true,
  });
} 

export async function createUserBackgroundTopicAction(
  title: string,
  description: string,
  level: string
) {
  return baseApiAction<UserBackgroundTopicResponseType>(`/user-background-topic`, {
    method: "POST",
    body: { title, description, level },
    requiresAuth: true,
  });
} 

export async function updateUserBackgroundTopicAction(
  id: string,
  title: string,
  description: string,
  level: string
) {
  return baseApiAction<UserBackgroundTopicResponseType>(`/user-background-topic/${id}`, {
    method: "PATCH",
    body: { title, description, level },
    requiresAuth: true,
  });
} 

export async function deleteUserBackgroundTopicAction(id: string) {
  return baseApiAction<UserBackgroundTopicResponseType>(`/user-background-topic/${id}`, {
    method: "DELETE",
    requiresAuth: true,
  });
} 