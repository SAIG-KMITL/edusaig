"use client";

import HeaderPage from "@/components/HeaderPage/HeaderPage";
import { CourseModuleResponseType, CourseType } from "@/types/course.type";
import { ExamAnswerType, ExamAttempt, ExamType } from "@/types/exam.type";
import { QuestionOptionType, QuestionType } from "@/types/question.type";
import { RECOMMENDATION } from "@/utils/enums/recommendation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ExamRecommendUIProps {
  exams: ExamType[];
  questions: QuestionType[];
  course: CourseType;
  question_options: QuestionOptionType[];
  exam_answers: ExamAnswerType[];
  exam_attempts: ExamAttempt[];
  courseModuleResponse: CourseModuleResponseType[];
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
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [courseModule, setCourseModule] = useState<CourseModuleResponseType>();
  const [exam, setExam] = useState<ExamType>();
  const [lastAttempt, setLastAttempt] = useState<ExamAttempt>();
  const [totalScore, setTotalScore] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const foundCourseModule = courseModuleResponse.find(
      (module) => module.courseId === course.id
    );
    setCourseModule(foundCourseModule);

    if (foundCourseModule) {
      const foundExam = exams.find(
        (exam) => exam.courseModule && exam.courseModule.id === foundCourseModule.id
      );
      setExam(foundExam);

      if (foundExam) {
        const examAttempts = exam_attempts.filter(
          (attempt) => attempt.examId === foundExam.id
        );

        const sortedAttempts = examAttempts.sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });

        const mostRecentAttempt = sortedAttempts[0];
        setLastAttempt(mostRecentAttempt);

        if (mostRecentAttempt) {
          setSummaryPoints(mostRecentAttempt.score);
        }

        setTotalQuestions(questions.length);

        const totalScore = questions.reduce((acc, question) => {
          return acc + question.points;
        }, 0);

        setTotalScore(totalScore);
        setIsLoaded(true);
      }
    }
  }, [course.id, courseModuleResponse, exams, exam_attempts]);

  const getLevelColor = (percentage: number) => {
    if (percentage >= 80) return "text-advanced";
    if (percentage >= 60) return "text-intermediate";
    return "text-beginner";
  };

  const getScoreAnimation = () => {
    const percentage = Math.round((summaryPoints / totalScore) * 100);
    if (percentage >= 80) return "animate-pulse-scale";
    if (percentage >= 60) return "animate-fade-scale-in";
    return "animate-fade-up";
  };

  const handleBackToCourse = () => {
    router.push(`/course/${course.id}`);
  };

  return (
    <div className="min-h-screen bg-steelGray bg-opacity-95 animate-gradient-shift">
      <div className="flex flex-col justify-start items-center w-auto mx-4 lg:mx-24 sm:mx-12 py-4 space-y-8">
        <div className="animate-fade-slide-in w-full">
          <div className="flex justify-start items-start">
            <HeaderPage namePage={course.title} />
          </div>
        </div>

        <div className="w-full animate-fade-up">
          <h2 className="text-2xl font-medium text-skyBlue">{exam?.title}</h2>
        </div>

        <div
          className="flex flex-col lg:grid lg:grid-cols-4 gap-8 w-full max-h-[960px] lg:max-h-[720px] 
            overflow-hidden p-8 rounded-3xl bg-darkMagenta bg-opacity-10 backdrop-blur-md 
            shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-scale-in"
        >
          <div className="flex flex-col gap-8 font-semibold text-xl">
            <div
              className="flex flex-col items-center gap-4 w-full h-auto p-8 rounded-xl 
                bg-royalPurple bg-opacity-20 backdrop-blur-md shadow-lg 
                hover:scale-102 transition-transform duration-300"
            >
              <h4 className="text-skyBlue">Score</h4>
              <p className={`text-4xl ${getScoreAnimation()} text-oceanBlue`}>
                {summaryPoints}/{totalScore}
              </p>
            </div>

            <div
              className="flex flex-col items-center gap-4 w-full h-auto p-8 rounded-xl 
                bg-royalPurple bg-opacity-20 backdrop-blur-md shadow-lg 
                hover:scale-102 transition-transform duration-300"
            >
              <h4 className="text-skyBlue">Your Level</h4>
              <p
                className={`text-4xl ${getLevelColor(
                  Math.round((summaryPoints / totalScore) * 100)
                )}`}
              >
                {Math.round((summaryPoints / totalScore) * 100)}%
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:col-span-3 h-full gap-4">
            <div
              className="w-full h-fit max-h-[360px] lg:max-h-[480px] border-2 border-electricViolet 
                p-6 rounded-xl overflow-y-auto bg-royalPurple bg-opacity-10 backdrop-blur-md"
            >
              <h3 className="text-2xl font-semibold text-silver mb-4">
                Recommendations
              </h3>
              <div className="prose prose-invert max-w-none text-white">
                {RECOMMENDATION.FINAL}
              </div>
            </div>

            <div className="flex justify-end items-center my-4">
              <button
                onClick={handleBackToCourse}
                className="px-6 py-3 bg-oceanBlue text-white rounded-lg 
                    hover:bg-electricViolet transition-all duration-300 
                    hover:scale-102 active:scale-98 shadow-lg"
              >
                Back to Course
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
