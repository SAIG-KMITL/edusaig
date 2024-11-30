"use client";

import emptyCheck from "@/../public/ulits/empty-check.svg";
import fillCheck from "@/../public/ulits/fill-check.svg";
import { createExamAnswerAction } from "@/actions/examAnswerAction";
import {
  createExamAttemptAction,
  updateExamAttemptAction,
  updateExamAttemptBySubmitAction,
} from "@/actions/examAttemptAction";
import HeaderPage from "@/components/HeaderPage/HeaderPage";
import { Toast } from "@/components/Toast/Toast";
import {
  CourseModuleResponseType,
  CourseModuleType,
  CourseType,
} from "@/types/course.type";
import { ExamAnswerType, ExamAttempt, ExamType } from "@/types/exam.type";
import { QuestionOptionType, QuestionType } from "@/types/question.type";
import { ExamAttemptStatus } from "@/utils/enums/examAttempt";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

interface finalExamUIProps {
  exams: ExamType[];
  questions: QuestionType[];
  exam_attempt_id: string;
  exam_attempts: ExamAttempt[];
  courseModule: CourseModuleResponseType;
  course: CourseType;
}

export default function FinalExamUI({
  exams,
  questions,
  exam_attempt_id,
  exam_attempts,
  courseModule,
  course,
}: finalExamUIProps) {
  const [exam, setExam] = useState<ExamType>();

  useEffect(() => {
    if (courseModule) {
      setExam(exams.find((exam) => exam.courseModuleId === courseModule.id));
    }
  }, []);

  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(
    Array(questions.length).fill(null)
  );
  const router = useRouter();

  if (!exam) {
    return null;
  }

  const handleOptionClicked = (optionIndex: number) => {
    setSelectedAnswers((prevSelectedAnswer) => {
      const newSelectedAnswer = [...prevSelectedAnswer];
      newSelectedAnswer[questionIndex] = optionIndex;
      return newSelectedAnswer;
    });

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      let cor = 0;

      for (let i = 0; i < questions.length; i++) {
        const selectedOption = selectedAnswers[i];

        if (questions[i].options[selectedOption].isCorrect) {
          cor += questions[i].points;
        }

        const response = await createExamAnswerAction(
          exam_attempt_id,
          questions[i].options[selectedOption].id,
          questions[i].options[selectedOption].optionText,
          questions[i].options[selectedOption].isCorrect,
          questions[i].options[selectedOption].isCorrect
            ? questions[i].points
            : 0
        );
        console.log(response);
      }

      const response = await updateExamAttemptAction(
        exam_attempt_id,
        cor,
        ExamAttemptStatus.COMPLETED
      );

      const update = await updateExamAttemptBySubmitAction(exam_attempt_id);

      router.push(`/course/${course.id}/exam-recommend`);
      return Toast("Final-Exam submitted", "success");
    } catch (error: any) {
      console.log(error);
      Toast("ERROR : ", error.message);
    }
  };

  const checkIcon = questions.map((_, index) =>
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
            {questionIndex + 1}.) {questions[questionIndex].question}
          </p>
          <div className="flex-wrap grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-6 h-full px-12 md:px-24">
            {questions[questionIndex].options.map((option, index) => (
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
              {questionIndex < questions.length - 1 && (
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
