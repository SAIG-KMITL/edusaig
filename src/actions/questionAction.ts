import { PreTestQuestionResponseType } from "@/types/question.type";
import { baseApiAction } from "./baseAction";


export async function fetchQuestionsByPretestAction(pretestId: string) {
  return baseApiAction<PreTestQuestionResponseType>(`/question/pretest/${pretestId}`, {
    method: "GET",
    requiresAuth: true,
  });
}