"use client";

import { exam } from "@/constants/exam";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function QuizUI() {
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(Array(exam.questions.length).fill(null));
  
  const router = useRouter();

  const handleOptionClicked = (optionIndex: number) => {
    setSelectedAnswers(prevSelectedAnswer => {
      const newSelectedAnswer = [...prevSelectedAnswer];
      newSelectedAnswer[questionIndex] = optionIndex;
      return newSelectedAnswer;
    });

    if(questionIndex < exam.questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/course/${exam.courseModuleId}/quiz/result`);
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex flex-col sm:mx-16 lg:mx-[120px] my-12 border border-gray-300 rounded-xl"
    >
      <h1 className="py-16 px-10 rounded-t-xl text-[28px] font-medium text-center bg-gray-300">
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
              <button 
                key={option.id}
                type="button" 
                onClick={() => handleOptionClicked(index)}
                className={`px-6 py-3 border rounded-lg text-center ${selectedAnswers[questionIndex] == index ? "border-sky-400 bg-sky-100" : "border border-gray-300 hover:bg-gray-100"}`} 
              >{option.optionText}</button>
            );
          })}
        </div>
        <div className="px-24 flex flex-col justify-center items-center gap-6">
          <div className="flex flex-row justify-center gap-8">
            { questionIndex > 0 && 
              <button
                type="button"
                onClick={() => setQuestionIndex(questionIndex - 1)}
                className="w-[140px] px-6 py-3 border-2 hover:bg-gray-100 border-gray-600 font-medium text-gray-600 rounded-full"
              >
                Back
              </button>
            }
            { questionIndex < exam.questions.length - 1 &&
              <button
                type="button"
                onClick={() => setQuestionIndex(questionIndex + 1)}
                className="w-[140px] px-6 py-3 border-2 border-gray-600 bg-gray-600 hover:bg-gray-700 font-medium text-white rounded-full"
              >
                {selectedAnswers[questionIndex] != null ? "Next" : "Skip"}
              </button>
            }
          </div>
          
          {
            selectedAnswers.every(answer => answer !== null) &&
            <button
              type="submit"
              className="w-[140px] px-6 py-3 bg-sky-500 hover:bg-sky-600 text-[18px] font-semibold text-white rounded-lg"
            >
              Submit
            </button>
          }
        </div>
      </div>
    </form>
  );
}