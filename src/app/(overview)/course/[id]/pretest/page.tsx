import {
  createExamAttemptByPretestAction,
  fetchExamAttemptByPretestAction,
} from "@/actions/examAttemptAction";
import { fetchPretestsAction } from "@/actions/pretestAction";
import { fetchQuestionsByPretestAction } from "@/actions/questionAction";
import { fetchPretestQuestionOptionsAction } from "@/actions/questionOptionAction";
import PreTestUI from "@/app/shared/(ui)/PreTestUI";

export default async function PreTestPage() {
  const pretest = await fetchPretestsAction();

  if (!pretest.data?.data[0]?.id) {
    return null;
  }

  const pretestId = pretest.data?.data[0]?.id as string;

  const examAttempt = await fetchExamAttemptByPretestAction();
  let examAttemptId = examAttempt.data?.data[0]?.id;

  if (!examAttemptId) {
    const examAttempt = await createExamAttemptByPretestAction(pretestId);
    if (!examAttempt.data?.id) {
      return null;
    } else {
      examAttemptId = examAttempt.data.id;
    }
  }

  const questions = await fetchQuestionsByPretestAction(
    pretest.data?.data[0]?.id as string
  );

  if (!questions.data?.data) {
    return null;
  }

  const questionsWithOptions = await Promise.all(
    questions.data?.data.map(async (question) => {
      const option = await fetchPretestQuestionOptionsAction(
        question.id as string
      );
      if (option.data) {
        question.options = option.data.data;
      }
      return question;
    })
  );

  return (
    <PreTestUI
      examAttemptId={examAttemptId}
      title={pretest.data?.data[0]?.title}
      courseModuleId="1"
      pretestId={pretestId}
      questions={questionsWithOptions}
    />
  );
}
