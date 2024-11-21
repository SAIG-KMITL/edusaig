"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import HeaderPage from "@/components/HeaderPage/HeaderPage";
import { ExamType } from "@/types/exam.type";

export default function ExamRecommendUI({ finalExam }: { finalExam: ExamType }) {
    const router = useRouter();
    const courseName = "Java Course";

    const selectedAnswers = [0, 1, 3, 2, 3, 2, 0, 2, 0, 2, 2, 0, 2];
    const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
    const [summaryPoints, setSummaryPoints] = useState<number>(0);

    useEffect(() => {
        let correctCount = 0;
        let points = 0;

        finalExam.questions.forEach((question, index) => {
            const selectedAnswerIndex = selectedAnswers[index];
            const selectedOption = question.options[selectedAnswerIndex];

            if (selectedOption && selectedOption.isCorrect) {
                correctCount++;
                points += question.points;
            }
        });

        setCorrectAnswersCount(correctCount);
        setSummaryPoints(points);
    }, [finalExam.questions, selectedAnswers]);

    const handleBackToCourse = () => {
        router.push(`/course/${finalExam.courseModuleId}`);
    };

    return (
        <div className="flex flex-col justify-center items-center w-auto mx-4 lg:mx-24 sm:mx-12 py-4 space-y-8">
            <HeaderPage namePage={courseName} />
            <div className="flex justify-start items-center w-full">
                <h2 className="text-2xl font-medium text-slate-100">{finalExam.title}</h2>
            </div>
            <div className="flex flex-col lg:grid lg:grid-cols-4 gap-8 w-full max-h-[960px] lg:max-h-[720px] 
            overflow-hidden p-8 my-4 lg:my-24 sm:my-12 rounded-3xl bg-slate-100 bg-opacity-5 backdrop-blur-md text-black">
                <div className="flex flex-col gap-8 font-semibold text-xl">
                    <div className="flex flex-col items-center gap-4 w-full h-auto p-8 rounded-xl bg-slate-50">
                        <h4>Score</h4>
                        <p>{correctAnswersCount}/{finalExam.questions.length}</p>
                    </div>
                    <div className="flex flex-col items-center gap-4 w-full h-auto p-8 rounded-xl bg-slate-50">
                        <h4>Your Level</h4>
                        <p>{summaryPoints}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:col-span-3 h-full gap-4">
                    <div className="w-full h-fit max-h-[360px] lg:max-h-[480px] border-2 border-slate-50 p-2 overflow-y-auto">
                        <div className="flex flex-col justify-start items-start w-full">
                            <h2 className="text-2xl font-semibold text-slate-100">Recommendation</h2>
                            <p className="text-lg font-light text-slate-100">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores necessitatibus hic reprehenderit, eveniet totam, unde quae iure a sit doloribus architecto dicta dolorem fuga, repellat harum modi adipisci aspernatur earum! Est sint sit et id voluptates minus quia, error veritatis eius ratione recusandae. Quod dignissimos quisquam quam magni dolorum aliquam!</p>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                            {finalExam.questions.map((question, index) => {
                                const selectedAnswerIndex = selectedAnswers[index];
                                const selectedOption = question.options[selectedAnswerIndex];
                                const isCorrect = selectedOption && selectedOption.isCorrect;

                                return (
                                    <div
                                        key={question.id}
                                        className={`p-4 border-2 rounded-lg break-words ${
                                            isCorrect
                                                ? "border-green-500 bg-green-100"
                                                : selectedOption
                                                ? "border-red-500 bg-red-100"
                                                : "border-gray-500 bg-gray-100"
                                        }`}
                                    >
                                        <p>
                                            <strong>Question {index + 1}:</strong> {question.question}
                                        </p>
                                        {selectedOption ? (
                                            <>
                                                <p>
                                                    <strong>Your Answer:</strong> {selectedOption.optionText}
                                                </p>
                                                {!isCorrect && (
                                                    <p>
                                                        <strong>Reason:</strong>{" "}
                                                        {question.options.find(option => option.isCorrect)?.explanation}
                                                    </p>
                                                )}
                                            </>
                                        ) : (
                                            <p className="text-red-500">
                                                <strong>No Answer Selected</strong>
                                            </p>
                                        )}
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
