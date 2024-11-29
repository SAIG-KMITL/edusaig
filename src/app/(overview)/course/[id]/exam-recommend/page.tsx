import { fetchCourseAction } from "@/actions/courseAction";
import { fetchExamAction } from "@/actions/examAction";
import { fetchExamAnswersAction } from "@/actions/examAnswerAction";
import { fetchExamAttemptsAction } from "@/actions/examAttemptAction";
import { fetchQuestionsAction } from "@/actions/questionAction";
import { fetchQuestionOptionsAction } from "@/actions/questionOptionAction";
import ExamRecommendUI from "@/app/shared/(ui)/ExamRecommendUI";

interface ExamProps {
  params: Promise<{ id: string }>;
}

export default async function ExamRecommendPage({ params }: ExamProps) {
  const { id } = await params;

  const exam = await fetchExamAction(id);
  const questions = await fetchQuestionsAction();
  const question_options = await fetchQuestionOptionsAction();
  const exam_answers = await fetchExamAnswersAction();
  const exam_attempts = await fetchExamAttemptsAction();
  const course = await fetchCourseAction(id);

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
  if (!course.data) {
    return null;
  }
  return (
    <ExamRecommendUI
      exam={exam.data}
      questions={questions.data.data}
      question_options={question_options.data.data}
      exam_answers={exam_answers.data.data}
      exam_attempts={exam_attempts.data}
      course={course.data}
    />
  );
}
