import { PreTestQuestionResponseType } from "@/types/question.type";
import { baseApiAction } from "./baseAction";


export async function fetchQuestionsByPretestIdAction(pretestId: string) {
  return baseApiAction<PreTestQuestionResponseType>(`/question/pretest/${pretestId}`, {
    method: "GET",
    requiresAuth: true,
  });
}

export async function fetchQuestionPretestAction() {
  return baseApiAction<PreTestQuestionResponseType>(`/question/pretest`, {
    method: "GET",
    requiresAuth: true,
  });
}