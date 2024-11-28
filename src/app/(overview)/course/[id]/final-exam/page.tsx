import FinalExamUI from "@/app/shared/(ui)/FinalExamUI";
import { fetchExamAction } from "@/actions/examAction";
import { fetchQuestionsAction } from "@/actions/questionAction";
import { fetchQuestionOptionsAction } from "@/actions/questionOptionAction";
import { fetchExamAnswersAction } from "@/actions/examAnswerAction";
import { fetchExamAttemptsAction } from "@/actions/examAttemptAction";
// import { exam } from "@/constants/exam";

interface ChapterProps {
  params: { id: string; chapterId: string };
  searchParams: Record<string, string>;
}

export default async function ExamRecommendPage({ params }: ChapterProps) {
  const { id } = await params;

  const exam = await fetchExamAction(id);
  const questions = await fetchQuestionsAction();
  const question_options = await fetchQuestionOptionsAction();
  const exam_answers = await fetchExamAnswersAction();
  const exam_attempts = await fetchExamAttemptsAction();

  if (!exam.data) {
    return null;
  }
  if (!questions.data) {
    return null;
  }
  if (!question_options.data) {
    return null;
  }
  if (!exam_answers.data) {
    return null;
  }
  if (!exam_attempts.data) {
    return null;
  }

  return (
    <FinalExamUI
      exam={exam.data}
      questions={questions.data}
      question_options={question_options.data}
      exam_answers={exam_answers.data}
      exam_attempts={exam_attempts.data}
    />
  );
}
