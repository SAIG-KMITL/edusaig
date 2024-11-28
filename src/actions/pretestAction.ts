import { PretestsResponseType } from "@/types/pretest.type";
import { baseApiAction } from "./baseAction";

export async function fetchPretestsAction() {
  return baseApiAction<PretestsResponseType>(`/pretest`, {
    method: "GET",
    requiresAuth: true,
  });
}

export async function fetchPretestAction(id: string) {
  return baseApiAction<PretestsResponseType>(`/pretest/${id}`, {
    method: "GET",
    requiresAuth: true,
  });
}