import { fetchExamAttemptByPretestAction } from "@/actions/examAttemptAction";
import { fetchQuestionsByPretestAction } from "@/actions/questionAction";
import { fetchRoadmapByUserAction } from "@/actions/roadmapAction";
import PreTestResultUI from "@/app/shared/(ui)/PreTestResultUI";

export default async function page() {
  const examAttempt = await fetchExamAttemptByPretestAction();

  if (!examAttempt.data) {
    return null;
  }

  const questions = await fetchQuestionsByPretestAction(
    examAttempt.data?.data[0]?.pretestId as string
  );

  if (!questions.data?.data) {
    return null;
  }

  const roadmap = await fetchRoadmapByUserAction();

  if (!roadmap.data) {
    return null;
  }

  return (
    <PreTestResultUI
      title={examAttempt.data?.data[0]?.pretest.title}
      examAttempt={examAttempt.data}
      questions={questions.data.data}
      roadmap={roadmap.data}
    />
  );
}
