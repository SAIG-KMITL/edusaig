"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QuestionType } from "@/types/question.type";
import { QuestionOptionType } from "@/types/question.type";
import { ExamAnswerType } from "@/types/exam.type";
import HeaderPage from "@/components/HeaderPage/HeaderPage";
import { ExamAttempt, ExamType } from "@/types/exam.type";
import { CourseModuleResponseType, CourseType } from "@/types/course.type";

interface ExamRecommendUIProps {
  exams: ExamType[];
  questions: QuestionType[];
  course: CourseType;
  question_options: QuestionOptionType[];
  exam_answers: ExamAnswerType[];
  exam_attempts: ExamAttempt[];
  courseModuleResponse: CourseModuleResponseType[]
}

export default function ExamRecommendUI({
  exams,
  exam_attempts,
  course,
  questions,
  question_options,
  exam_answers,
  courseModuleResponse,
}: ExamRecommendUIProps) {
  const router = useRouter();

  const [summaryPoints, setSummaryPoints] = useState<number>(0);
    const [courseModule, setCourseModule] = useState<CourseModuleResponseType>();
    const [exam, setExam] = useState<ExamType>()
  useEffect(() => {
    const filterpts = exam_attempts.filter((exam) => exam.examId === exam.id);
    const points = filterpts.findLast((arr) => arr);
    if (points) {
      setSummaryPoints(points.score);
    }
    setCourseModule(courseModuleResponse.find(moduleId=>moduleId.courseId === course.id))
    if (courseModule){
        setExam(exams.find(exam => exam.courseModuleId === courseModule.id))
    }
  },[]);

  const handleBackToCourse = () => {
    router.push(`/course/${course.id}`);
  };

  return (
    <div className="flex flex-col justify-center items-center w-auto mx-4 lg:mx-24 sm:mx-12 py-4 space-y-8">
      <HeaderPage namePage={course.title} />
      <div className="flex justify-start items-center w-full">
        <h2 className="text-2xl font-medium text-slate-100">{exam?.title}</h2>
      </div>
      <div
        className="flex flex-col lg:grid lg:grid-cols-4 gap-8 w-full max-h-[960px] lg:max-h-[720px] 
            overflow-hidden p-8 my-4 lg:my-24 sm:my-12 rounded-3xl bg-slate-100 bg-opacity-5 backdrop-blur-md text-black"
      >
        <div className="flex flex-col gap-8 font-semibold text-xl">
          <div className="flex flex-col items-center gap-4 w-full h-auto p-8 rounded-xl bg-slate-50">
            <h4>Score</h4>
            <p>
              {summaryPoints}/{exam?.questions.length}
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 w-full h-auto p-8 rounded-xl bg-slate-50">
            <h4>Your Level</h4>
            <p>{summaryPoints}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:col-span-3 h-full gap-4">
          <div className="w-full h-fit max-h-[360px] lg:max-h-[480px] border-2 border-slate-50 p-2 overflow-y-auto">
            <div className="flex flex-col justify-start items-start w-full">
              <h2 className="text-2xl font-semibold text-slate-100">
                Recommendation
              </h2>
              <p className="text-lg font-light text-slate-100">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
                necessitatibus hic reprehenderit, eveniet totam, unde quae iure
                a sit doloribus architecto dicta dolorem fuga, repellat harum
                modi adipisci aspernatur earum! Est sint sit et id voluptates
                minus quia, error veritatis eius ratione recusandae. Quod
                dignissimos quisquam quam magni dolorum aliquam!
              </p>
            </div>

            <div className="flex flex-col gap-2">
              {exam?.questions.map((question, index) => {
                const selectedOption = question.options[index].isCorrect;

                return (
                  <div
                    key={question.id}
                    className={`p-4 border-2 rounded-lg break-words ${
                      selectedOption
                        ? "border-green-500 bg-green-100"
                        : selectedOption
                        ? "border-red-500 bg-red-100"
                        : "border-gray-500 bg-gray-100"
                    }`}
                  >
                    <p>
                      <strong>Question {index + 1}:</strong> {question.question}
                    </p>
                    <p>
                      <strong>Answer:</strong>{" "}
                      {
                        question.options.find((option) => option.isCorrect)
                          ?.optionText
                      }
                    </p>
                    <p>
                      <strong>Reason:</strong>{" "}
                      {
                        question.options.find((option) => option.isCorrect)
                          ?.explanation
                      }
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-end items-center my-4">
            <button
              onClick={handleBackToCourse}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-purple-700 transition-all duration-200"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
