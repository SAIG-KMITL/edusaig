"use client";

import { exam } from "@/constants/exam";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { courses } from "@/constants/course";
import { CourseType } from "@/types/course.type";
import { motion } from "framer-motion";
import { QuestionType } from "@/types/question.type";
import { Toast } from "@/components/Toast/Toast";
import { createExamAnswerAction } from "@/actions/examAnswerAction";
import {
  updateExamAttemptPretestAction,
  updateExamAttemptPretestBySubmitAction,
} from "@/actions/examAttemptAction";
import { ExamAttemptStatus } from "@/utils/enums/examAttempt";
import { createPretestEvaluateAction } from "@/actions/pretestAction";
import { createRoadmapByAiAction } from "@/actions/roadmapAction";

export interface PreTestUIProps {
  title: string;
  courseModuleId: string;
  examAttemptId: string;
  pretestId: string;
  questions: QuestionType[];
}

export default function PreTestUI(exam: PreTestUIProps) {
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    Array(exam.questions.length).fill(null)
  );
  const [course, setCourse] = useState<CourseType>();
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const param = useParams();

  useEffect(() => {
    setCourse(courses.find((item) => item.id == param.id));
  }, []);

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
      setLoading(true);
      let acc = 0;
      for (let i = 0; i < exam.questions.length; i++) {
        if (selectedAnswers[i] == null) {
          return Toast("Please answer all questions", "error");
        }

        const selectedOption = selectedAnswers[i] ?? 0;

        if (exam.questions[i].options[selectedOption].isCorrect) {
          acc++;
        }

        const response = await createExamAnswerAction(
          exam.examAttemptId,
          exam.questions[i].options[selectedOption].id,
          exam.questions[i].options[selectedOption].optionText,
          exam.questions[i].options[selectedOption].isCorrect,
          exam.questions[i].options[selectedOption].isCorrect
            ? exam.questions[i].points
            : 0
        );
      }

      const response = await updateExamAttemptPretestAction(
        exam.examAttemptId,
        acc,
        ExamAttemptStatus.COMPLETED
      );

      if (response.error?.message) {
        router.push("/pretest/result");
        return Toast(response.error.message, "error");
      }

      const update = await updateExamAttemptPretestBySubmitAction(
        exam.examAttemptId
      );

      if (update.error?.message) {
        console.log(update.error.message);
        return Toast(update.error.message, "error");
      }

      const evaluate = await createPretestEvaluateAction(exam.pretestId);
      console.log(evaluate);

      const roadmap = await createRoadmapByAiAction(
        evaluate.data?.result as string
      );

      console.log(roadmap);

      Toast("Pretest submitted", "success");
      router.push("/pretest/result");
    } catch (error) {
      Toast(
        error instanceof Error ? error.message : "Failed to submit pretest",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="absolute top-[80px] text-white sm:left-10 flex items-center">
        <Link
          href={`/course`}
          className="px-6 py-2 flex h-full justify-center items-center bg-royalPurple/20 hover:bg-royalPurple/30 rounded-full"
        >
          <ChevronLeft className="mr-2 w-5 h-5" />
          Back
        </Link>
        <div className="ml-10 text-xl font-semibold">{course?.title}</div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="text-white flex flex-col sm:mx-16 lg:mx-[120px] my-14 border border-darkMagenta rounded-xl"
      >
        <h1 className="py-16 px-10 rounded-t-xl text-[28px] font-medium text-center bg-darkMagenta/30">
          {exam.title}
        </h1>
        <div className="py-6 flex flex-col gap-12">
          <div className="flex flex-col gap-3">
            <h2 className="text-[22px] text-center">{`Question ${
              questionIndex + 1
            } of ${exam.questions.length}`}</h2>
            <h2 className="text-[18px] text-center">
              {exam.questions[questionIndex]?.question}
            </h2>
          </div>
          <div className="px-12 md:px-24 grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-6 flex-wrap">
            {exam.questions[questionIndex]?.options?.map((option, index) => {
              return (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  key={option.id}
                  type="button"
                  onClick={() => handleOptionClicked(index)}
                  className={`px-6 py-3 border rounded-lg text-center ${
                    selectedAnswers[questionIndex] == index
                      ? "border-royalPurple bg-royalPurple/40"
                      : "border border-royalPurple hover:bg-royalPurple"
                  }`}
                >
                  {option.optionText}
                </motion.button>
              );
            })}
          </div>
          <div className="px-24 flex flex-col justify-center items-center gap-6">
            <div className="flex flex-row justify-center gap-8">
              {questionIndex > 0 && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  type="button"
                  onClick={() => setQuestionIndex(questionIndex - 1)}
                  className="w-[140px] px-6 py-3 border-2 hover:bg-darkMagenta border-darkMagenta font-medium rounded-full"
                >
                  Back
                </motion.button>
              )}
              {questionIndex < exam.questions.length - 1 && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  type="button"
                  onClick={() => setQuestionIndex(questionIndex + 1)}
                  className="w-[140px] px-6 py-3 border-2 border-oceanBlue/90 bg-oceanBlue hover:bg-oceanBlue/95 font-medium rounded-full"
                >
                  {selectedAnswers[questionIndex] != null ? "Next" : "Skip"}
                </motion.button>
              )}
            </div>

            {selectedAnswers.every((answer) => answer !== null) && (
              <motion.button
                disabled={loading}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                type="submit"
                className="w-[140px] px-6 py-3 bg-sky-700 hover:bg-sky-700/90 text-[18px] font-semibold text-white rounded-xl"
              >
                Submit
              </motion.button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
