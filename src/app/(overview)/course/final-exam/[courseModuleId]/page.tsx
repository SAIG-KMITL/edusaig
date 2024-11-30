import {
  fetchCourseModuleAction,
  fetchCourseModulesAction,
} from "@/actions/courseModuleAction";
import { fetchExamByModuleAction } from "@/actions/examAction";
import { fetchQuestionExamByExamIdAction } from "@/actions/questionAction";
import { fetchQuestionOptionExamAction } from "@/actions/questionOptionAction";
import FinalExamUI from "@/app/shared/(ui)/FinalExamUI";
import {
  createExamAttemptAction,
  fetchExamAttemptsAction,
} from "@/actions/examAttemptAction";
import { fetchCourseAction } from "@/actions/courseAction";
import { ExamAttemptStatus } from "@/utils/enums/examAttempt";
import { exam } from "@/constants/exam";

interface ExamProps {
  params: Promise<{ courseModuleId: string }>;
}

export default async function FinalExamPage({ params }: ExamProps) {
  const { courseModuleId: moduleId } = await params;

  const exams = await fetchExamByModuleAction(moduleId);
  const questions = exams.data
    ? await fetchQuestionExamByExamIdAction(exams.data.data[0].id)
    : null;

  const exam_attempts = await fetchExamAttemptsAction();
  const courseModule = await fetchCourseModuleAction(moduleId);
  const course = await fetchCourseAction(
    courseModule.data?.course.id as string
  );

  let current_examAttempt_id = "";

  if (!exams.data) {
    return null;
  }

  if (!questions?.data) {
    return null;
  }

  if (!exam_attempts.data) {
    return null;
  }

  if (!courseModule.data) {
    return null;
  }

  if (!course.data) {
    return null;
  }

  if (exam_attempts.data.meta.total < exams.data.data[0].maxAttempts) {
    const response = createExamAttemptAction(
      exams.data.data[0].id,
      0,
      ExamAttemptStatus.IN_PROGRESS
    );

    if ((await response).data?.id) {
      current_examAttempt_id = (await response).data?.id as string;
    }
  } else {
    current_examAttempt_id = exam_attempts.data.data.findLast((arr) => arr)
      ?.id as string;
  }

  const questionsWithOptions = await Promise.all(
    questions.data.data.map(async (question) => {
      const option = await fetchQuestionOptionExamAction(question.id);

      if (option.data) {
        question.options = option.data.data;
      }
      return question;
    })
  );
  return (
    <FinalExamUI
      exams={exams.data.data}
      questions={questions.data.data}
      exam_attempt_id={current_examAttempt_id}
      exam_attempts={exam_attempts.data.data}
      courseModule={courseModule.data}
      course={course?.data}
    />
  );
}
