import { PreTestEvaluateResponse, PretestsResponseType, PretestType } from "@/types/pretest.type";
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

export async function createPretestAction(title: string, description: string, timeLimit: number = 20, passingScore: number = 3, maxAttempts: number = 1) {
  return baseApiAction<PretestType>(`/pretest`, {
    method: "POST",
    requiresAuth: true,
    body: { title, description, timeLimit, passingScore, maxAttempts },
  });
}

export async function createPretestEvaluateAction(pretestId: string) {
  return baseApiAction<PreTestEvaluateResponse>(`/pretest/evaluate/${pretestId}`, {
    method: "POST",
    requiresAuth: true,
  });
}