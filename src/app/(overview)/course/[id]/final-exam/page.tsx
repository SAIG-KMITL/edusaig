import FinalExamUI from "@/app/shared/(ui)/FinalExamUI";
import { fetchExamsAction } from "@/actions/examAction";
import { fetchQuestionsAction } from "@/actions/questionAction";
import { fetchQuestionOptionsAction } from "@/actions/questionOptionAction";
import { fetchExamAnswersAction } from "@/actions/examAnswerAction";
import { fetchExamAttemptsAction } from "@/actions/examAttemptAction";
import { fetchCourseAction } from "@/actions/courseAction";
import {
  fetchCourseModulesByCourseAction,
} from "@/actions/courseModuleAction";

interface ExamProps {
  params: { id: string };
  searchParams: Record<string, string>;
}

export default async function FinalExamPage({ params }: ExamProps) {
  const { id } = await params;

  const exams = await fetchExamsAction();
  const questions = await fetchQuestionsAction();
  const question_options = await fetchQuestionOptionsAction();
  const exam_answers = await fetchExamAnswersAction();
  const exam_attempts = await fetchExamAttemptsAction();
  const courseModuleId = await fetchCourseModulesByCourseAction(id);
  const course = await fetchCourseAction(id);

  if (!exams.data) {
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
  if (!courseModuleId.data) {
    return null;
  }
  if (!course.data){
    return null;
  }

  return (
    <FinalExamUI
      exams={exams.data.data}
      questions={questions.data.data}
      question_options={question_options.data.data}
      exam_answers={exam_answers.data.data}
      exam_attempts={exam_attempts.data}
      courseModuleId={courseModuleId.data}
      course={course.data}
    />
  );
}
