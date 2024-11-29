import { fetchExamByModuleAction } from "@/actions/examAction";
import { fetchQuestionExamByExamIdAction } from "@/actions/questionAction";
import { fetchQuestionOptionExamAction } from "@/actions/questionOptionAction";

interface ExamProps {
  params: Promise<{ courseModuleId: string }>;
  searchParams: Record<string, string>;
}

export default async function FinalExamPage({ params }: ExamProps) {
  const { courseModuleId: moduleId } = await params;

  const exams = await fetchExamByModuleAction(moduleId);
  const questions = exams.data
    ? await fetchQuestionExamByExamIdAction(exams.data.data[0].id)
    : null;

  console.log("Exams : ", exams.data?.data);
  console.log("Question : ", questions?.data?.data);

  return (
    // <FinalExamUI
    //   exams={exams.data.data}
    //   questions={questions.data.data}
    //   question_options={question_options.data.data}
    //   exam_answers={exam_answers.data.data}
    //   exam_attempts={exam_attempts.data}
    //   courseModuleId={courseModule.data}
    //   course={course.data}
    // />
    <div>Final Exam</div>
  );
}
