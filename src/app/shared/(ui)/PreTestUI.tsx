"use client";

import { exam } from "@/constants/exam";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { courses } from "@/constants/course";
import { CourseType } from "@/types/course.type";
import { motion } from "framer-motion"

export default function PreTestUI() {
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(Array(exam.questions.length).fill(null));
  const [course, setCourse] = useState<CourseType>()

  const router = useRouter();
  const param = useParams();

  useEffect(() => {
    setCourse(courses.find(item => item.id == param.id))
  }, [])

  const handleOptionClicked = (optionIndex: number) => {
    setSelectedAnswers(prevSelectedAnswer => {
      const newSelectedAnswer = [...prevSelectedAnswer];
      newSelectedAnswer[questionIndex] = optionIndex;
      return newSelectedAnswer;
    });

    if (questionIndex < exam.questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/course/${exam.courseModuleId}/pretest/result`);
  }

  return (
    <div>
      <div className="absolute top-[80px] text-white sm:left-10 flex items-center">
        <Link href={`/course`} className="px-6 py-2 flex h-full justify-center items-center bg-royalPurple/20 hover:bg-royalPurple/30 rounded-full">
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
            <h2 className="text-[22px] text-center">{`Question ${questionIndex + 1} of ${exam.questions.length}`}</h2>
            <h2 className="text-[18px] text-center">{exam.questions[questionIndex].question}</h2>
          </div>
          <div className="px-12 md:px-24 grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-6 flex-wrap">
            {exam.questions[questionIndex].options.map((option, index) => {
              return (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  key={option.id}
                  type="button"
                  onClick={() => handleOptionClicked(index)}
                  className={`px-6 py-3 border rounded-lg text-center ${selectedAnswers[questionIndex] == index ? "border-royalPurple bg-royalPurple/40" : "border border-royalPurple hover:bg-royalPurple"}`}
                >{option.optionText}</motion.button>
              );
            })}
          </div>
          <div className="px-24 flex flex-col justify-center items-center gap-6">
            <div className="flex flex-row justify-center gap-8">
              {questionIndex > 0 &&
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  type="button"
                  onClick={() => setQuestionIndex(questionIndex - 1)}
                  className="w-[140px] px-6 py-3 border-2 hover:bg-darkMagenta border-darkMagenta font-medium rounded-full"
                >
                  Back
                </motion.button>
              }
              {questionIndex < exam.questions.length - 1 &&
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  type="button"
                  onClick={() => setQuestionIndex(questionIndex + 1)}
                  className="w-[140px] px-6 py-3 border-2 border-oceanBlue/90 bg-oceanBlue hover:bg-oceanBlue/95 font-medium rounded-full"
                >
                  {selectedAnswers[questionIndex] != null ? "Next" : "Skip"}
                </motion.button>
              }
            </div>

            {
              selectedAnswers.every(answer => answer !== null) &&
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                type="submit"
                className="w-[140px] px-6 py-3 bg-sky-700 hover:bg-sky-700/90 text-[18px] font-semibold text-white rounded-xl"
              >
                Submit
              </motion.button>
            }
          </div>
        </div>
      </form>
    </div>
  )
}
