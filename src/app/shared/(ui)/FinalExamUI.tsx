"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";
import Image from "next/image";

import fillCheck from "@/../public/ulits/fill-check.svg";
import emptyCheck from "@/../public/ulits/empty-check.svg";
import { ExamType } from "@/types/exam.type";
import HeaderPage from "@/components/HeaderPage/HeaderPage";

export default function FinalExamUI({ finalExam }: { finalExam: ExamType }) {
    const courseName = "Java Course";
    const [questionIndex, setQuestionIndex] = useState<number>(0);
    const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
        Array(finalExam.questions.length).fill(null)
    );

    const router = useRouter();

    useEffect(() => {
        console.log("Selected Answers Updated:", selectedAnswers);
    }, [selectedAnswers]);

    const handleOptionClicked = (optionIndex: number) => {
        setSelectedAnswers((prevSelectedAnswer) => {
            const newSelectedAnswer = [...prevSelectedAnswer];
            newSelectedAnswer[questionIndex] = optionIndex;
            return newSelectedAnswer;
        });

        if (questionIndex < finalExam.questions.length - 1) {
            setQuestionIndex(questionIndex + 1);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        router.push(`/course/${finalExam.courseModuleId}/exam-recommend`);
    };

    const checkIcon = finalExam.questions.map((_, index) =>
        selectedAnswers[index] !== null ? fillCheck : emptyCheck
    );

return (
    <div className="flex flex-col justify-center items-center w-auto mx-4 lg:mx-24 sm:mx-12 py-4 space-y-8">
        <HeaderPage namePage={courseName} />
        <div className="w-full h-[810px] lg:h-[720px] my-4 lg:my-24 sm:my-12 rounded-3xl bg-slate-100 bg-opacity-5 backdrop-blur-md">
            <div className="flex flex-col justify-center items-center w-full h-[200px] lg:h-[150px] space-y-4 rounded-3xl bg-slate-100">
                <h2 className="text-black">{finalExam.title}</h2>
                <div className="flex flex-wrap gap-8 p-4">
                {checkIcon.map((icon, index) => (
                    <div key={index} className="flex flex-col justify-center items-center space-y-4">
                    <Image
                        src={icon}
                        alt={selectedAnswers[index] !== null ? "Filled Check" : "Empty Check"}
                        width={30}
                        height={30}
                    />
                    </div>
                ))}
                </div>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col w-full h-[610px] lg:h-[570px] space-y-8 py-8">
                <p className="flex justify-center items-center w-full h-24">
                    {questionIndex+1}.) {finalExam.questions[questionIndex].question}
                </p>
                <div className="flex-wrap grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-6 h-full px-12 md:px-24">
                    {finalExam.questions[questionIndex].options.map((option, index) => (
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
                        {questionIndex < finalExam.questions.length - 1 && (
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
