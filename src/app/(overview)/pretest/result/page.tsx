import { fetchExamAttemptByPretestAction } from "@/actions/examAttemptAction";
import { fetchQuestionPretestAction } from "@/actions/questionAction";
import { fetchRoadmapByUserAction } from "@/actions/roadmapAction";
import PreTestResultUI from "@/app/shared/(ui)/PreTestResultUI";
import LoadingModal from "@/components/Modal/LoadingModal";

export default async function page() {
  const examAttempt = await fetchExamAttemptByPretestAction();

  if (!examAttempt.data) {
    return null;
  }

  const questions = await fetchQuestionPretestAction();
  if (!questions.data?.data) {
    return null;
  }

  const roadmap = await fetchRoadmapByUserAction();
  if (!roadmap.data) {
    return <LoadingModal status={true}/>;
  }

  return (
    <PreTestResultUI
      title={examAttempt.data?.data[0]?.pretest.title}
      examAttempt={examAttempt.data.data[0]}
      questions={questions.data.data}
      roadmap={roadmap.data.data}
    />
  );
}
