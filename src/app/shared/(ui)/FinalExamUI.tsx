"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";
import Image from "next/image";
import fillCheck from "@/../public/ulits/fill-check.svg";
import emptyCheck from "@/../public/ulits/empty-check.svg";
import { ExamAnswerType, ExamAttempt, ExamType } from "@/types/exam.type";
import HeaderPage from "@/components/HeaderPage/HeaderPage";
import { QuestionOptionType, QuestionType } from "@/types/question.type";
import { createExamAttemptAction } from "@/actions/examAttemptAction";
import { Toast } from "@/components/Toast/Toast";
import { CourseModuleResponseType, CourseType } from "@/types/course.type";

interface finalExamUIProps {
  exams: ExamType[];
  questions: QuestionType[];
  question_options: QuestionOptionType[];
  exam_answers: ExamAnswerType[];
  exam_attempts: ExamAttempt[];
  courseModuleId: CourseModuleResponseType[];
  course: CourseType;
}

export default function FinalExamUI({
  exams,
  questions,
  question_options,
  exam_answers,
  exam_attempts,
  courseModuleId,
  course,
}: finalExamUIProps) {
  const [exam, setExam] = useState<ExamType>();
  const [courseModule, setCourseModule] = useState<CourseModuleResponseType>();

  useEffect(() => {
    console.log("Selected Answers Updated:", selectedAnswers);
    setCourseModule(
      courseModuleId.find((moduleId) => moduleId.courseId === course.id)
    );
    if (courseModule) {
      setExam(exams.find((exam) => exam.courseModuleId === courseModule.id));
    }
  }, []);

  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(
    Array(exam?.questions.length).fill(null)
  );

  if (!exam) {
    return null;
  }

  const router = useRouter();

  const handleOptionClicked = (optionIndex: number) => {
    setSelectedAnswers((prevSelectedAnswer) => {
      const newSelectedAnswer = [...prevSelectedAnswer];
      newSelectedAnswer[questionIndex] = optionIndex;
      return newSelectedAnswer;
    });

    if (questionIndex < exam.questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      let cor = 0;
      for (let i = 0; i < exam.questions.length; i++) {
        const selectedOption = selectedAnswers[i];

        if (exam.questions[i].options[selectedOption].isCorrect) {
          cor++;
        }

        const CountExam = exam_attempts.filter(
          (exam) => exam.examId === exam.id
        );

        if (CountExam.length === exam.maxAttempts) {
          router.push(`/course/${course.id}/exam-recommend`);
          return Toast("You have used up your rights", "error");
        } else {
          await createExamAttemptAction(exam.id, cor, "completed");
          router.push(`/course/${course.id}/exam-recommend`);
          return Toast("Final-Exam submitted", "success");
        }
      }
    } catch (error: any) {
      Toast("ERROR : ", error.message);
    }
  };

  const checkIcon = exam.questions.map((_, index) =>
    selectedAnswers[index] !== null ? fillCheck : emptyCheck
  );

  return (
    <div className="flex flex-col justify-center items-center w-auto mx-4 lg:mx-24 sm:mx-12 py-4 space-y-8">
      <HeaderPage namePage={course.title} />
      <div className="w-full h-[810px] lg:h-[720px] my-4 lg:my-24 sm:my-12 rounded-3xl bg-slate-100 bg-opacity-5 backdrop-blur-md">
        <div className="flex flex-col justify-center items-center w-full h-[200px] lg:h-[150px] space-y-4 rounded-3xl bg-slate-100">
          <h2 className="text-black">{exam.title}</h2>
          <div className="flex flex-wrap gap-8 p-4">
            {checkIcon.map((icon, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center space-y-4"
              >
                <Image
                  src={icon}
                  alt={
                    selectedAnswers[index] !== null
                      ? "Filled Check"
                      : "Empty Check"
                  }
                  width={30}
                  height={30}
                />
              </div>
            ))}
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full h-[610px] text-white lg:h-[570px] space-y-8 py-8"
        >
          <p className="flex justify-center items-center w-full h-24">
            {questionIndex + 1}.) {exam.questions[questionIndex].question}
          </p>
          <div className="flex-wrap grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-6 h-full px-12 md:px-24">
            {exam.questions[questionIndex].options.map((option, index) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleOptionClicked(index)}
                className={`box-border px-8 py-4 border-2 rounded-2xl text-center ${
                  selectedAnswers[questionIndex] === index
                    ? "border-blue-500 font-semibold text-blue-500 hover:text-purple-700 hover:border-purple-700 transition-all duration-100"
                    : "border-slate-100 hover:text-black hover:bg-slate-100 transition-all duration-100"
                }`}
              >
                {option.optionText}
              </button>
            ))}
          </div>
          <div className="flex justify-end items-center px-24 gap-8">
            <div className="flex flex-row justify-center gap-8">
              {questionIndex > 0 && (
                <button
                  type="button"
                  onClick={() => setQuestionIndex(questionIndex - 1)}
                  className="box-border flex justify-center items-center w-36 py-4 border-2 border-slate-100 font-medium text-slate-100 rounded-full 
                                hover:bg-gray-100 hover:text-black transition-all duration-100"
                >
                  Back
                </button>
              )}
              {questionIndex < exam.questions.length - 1 && (
                <button
                  type="button"
                  onClick={() => setQuestionIndex(questionIndex + 1)}
                  className="box-border flex justify-center items-center w-36 py-4 border-2 border-slate-100 font-medium text-slate-100 rounded-full 
                                hover:bg-gray-100 hover:text-black transition-all duration-100"
                >
                  {selectedAnswers[questionIndex] != null ? "Next" : "Skip"}
                </button>
              )}
            </div>
            {selectedAnswers.every((answer) => answer !== null) && (
              <button
                type="submit"
                className="flex justify-center items-center w-36 py-4 bg-blue-500 font-semibold text-white rounded-xl
                            hover:bg-purple-700 transition-all duration-300"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
