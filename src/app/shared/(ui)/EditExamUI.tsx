"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Inputs/Input";
import { Trash2, Plus } from "lucide-react";

import { exam } from "@/constants/exam";

type QuestionChoice = {
    id: string;
    questionId: string;
    optionText: string;
    explanation: string;
    isCorrect?: boolean;
};

type QuestionType = {
    id: string;
    question: string;
    type: string;
    points: number;
    options: QuestionChoice[];
};

export default function EditExamUI() {
    const router = useRouter();
    const [title, setTitle] = useState<string>(exam.title);
    const [description, setDescription] = useState<string>(exam.description);
    const [timeLimit, setTimeLimit] = useState<number>(parseInt(exam.timeLimit.split(':')[0]));
    const [passingScore, setPassingScore] = useState<number>(exam.passingScore);
    const [questions, setQuestions] = useState<QuestionType[]>(exam.questions);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const generateQuestionId = () => {
        return `question${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    };

    const addQuestion = () => {
        const newQuestionId = generateQuestionId();
        const newQuestion: QuestionType = {
            id: newQuestionId,
            question: "",
            type: "multiple-choice",
            points: 1,
            options: [
                {
                    id: `option${Date.now()}_1`,
                    questionId: newQuestionId,
                    optionText: "",
                    explanation: "",
                    isCorrect: false
                },
                {
                    id: `option${Date.now()}_2`,
                    questionId: newQuestionId,
                    optionText: "",
                    explanation: "",
                    isCorrect: false
                }
            ]
        };
    
        setQuestions([...questions, newQuestion]);
    };

    const removeQuestion = (questionIndex: number) => {
        if (questions.length > 1) {
            const updatedQuestions = questions.filter((_, index) => index !== questionIndex);
            setQuestions(updatedQuestions);
        } else {
            alert("You must have at least one question.");
        }
    };

    const updateQuestionText = (questionIndex: number, text: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].question = text;
        setQuestions(updatedQuestions);
    };

    const updateQuestionPoints = (questionIndex: number, points: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].points = points;
        setQuestions(updatedQuestions);
    };

    const updateOptionText = (questionIndex: number, optionIndex: number, text: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex].optionText = text;
        setQuestions(updatedQuestions);
    };

    const updateOptionExplanation = (questionIndex: number, optionIndex: number, explanation: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex].explanation = explanation;
        setQuestions(updatedQuestions);
    };

    const toggleCorrectOption = (questionIndex: number, optionIndex: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options.forEach((option, idx) => {
            option.isCorrect = idx === optionIndex;
        });
        setQuestions(updatedQuestions);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            alert("Please enter an exam title");
            return;
        }

        const invalidQuestion = questions.find(q =>
            !q.question.trim() ||
            q.options.some(opt => !opt.optionText.trim()) ||
            q.options.every(opt => !opt.isCorrect)
        );

        if (invalidQuestion) {
            alert("Please fill in all question and option details, and ensure each question has a correct option");
            return;
        }

        const examData = {
            title,
            description,
            timeLimit: `${timeLimit}:00`,
            passingScore,
            questions
        };

        console.log("Exam Data:", examData);

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            router.push('/exam-preview');
        }, 1500);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 container my-4 lg:my-8 mx-auto p-4 lg:p-8 rounded-3xl bg-slate-100 bg-opacity-5 backdrop-blur-md"
        >
            <h2 className="text-4xl text-slate-50 font-semibold mb-4">Configure Your Exam</h2>
            <Input
                type="text"
                label="Exam Title"
                placeholder="Enter title for your exam"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                labelClassName="text-xl text-slate-50 font-semibold"
                className="bg-slate-50"
                required
            />
            <Input
                type="text"
                label="Exam Description"
                placeholder="Enter a brief description of the exam"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                labelClassName="text-xl text-slate-50 font-semibold"
                className="bg-slate-50"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    type="number"
                    label="Time Limit (minutes)"
                    placeholder="Enter exam time limit"
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(Number(e.target.value))}
                    labelClassName="text-xl text-slate-50 font-semibold"
                    className="bg-slate-50"
                    min={0}
                />

                <Input
                    type="number"
                    label="Passing Score (%)"
                    placeholder="Enter passing score percentage"
                    value={passingScore}
                    onChange={(e) => setPassingScore(Number(e.target.value))}
                    labelClassName="text-xl text-slate-50 font-semibold"
                    className="bg-slate-50"
                    min={0}
                    max={100}
                />
            </div>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl text-slate-50 font-semibold">Exam Questions</h2>
                    <button
                        type="button"
                        onClick={addQuestion}
                        className="flex items-center space-x-2 p-2 bg-green-500 rounded-xl text-white hover:bg-green-700 transition-all"
                    >
                        <Plus size={16} />
                        <span className="text-xl font-semibold">Add Question</span>
                    </button>
                </div>

                {questions.map((question, questionIndex) => (
                    <div
                        key={question.id}
                        className="bg-slate-200 rounded-xl p-6  relative"
                    >
                        <div className="absolute top-4 right-4">
                            {questions.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeQuestion(questionIndex)}
                                    className="text-red-500 hover:text-white hover:bg-red-500 rounded p-1 transition-all duration-200"
                                >
                                    <Trash2 size={16} />
                                </button>
                            )}
                        </div>
                        <div className="flex flex-col space-y-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    type="text"
                                    label={`Question ${questionIndex + 1}`}
                                    placeholder={`Enter question ${questionIndex + 1}`}
                                    value={question.question}
                                    onChange={(e) => updateQuestionText(questionIndex, e.target.value)}
                                    labelClassName="text-xl font-semibold"
                                    className="bg-slate-50"
                                    required
                                />

                                <Input
                                    type="number"
                                    label="Question Points"
                                    placeholder="Points for this question"
                                    value={question.points}
                                    onChange={(e) => updateQuestionPoints(questionIndex, Number(e.target.value))}
                                    labelClassName="text-xl font-semibold"
                                    className="bg-slate-50"
                                    min={1}
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {question.options.map((option, optionIndex) => (
                                    <div
                                        key={option.id}
                                        className="bg-white rounded-xl p-4 relative space-y-2"
                                    >
                                        <Input
                                            type="text"
                                            label={`Option ${optionIndex + 1}`}
                                            placeholder={`Enter option ${optionIndex + 1}`}
                                            value={option.optionText}
                                            onChange={(e) => updateOptionText(questionIndex, optionIndex, e.target.value)}
                                            labelClassName="text-xl font-semibold"
                                            className="bg-slate-50"
                                            required
                                        />

                                        <Input
                                            type="text"
                                            label="Option Explanation"
                                            placeholder="Explain this option"
                                            value={option.explanation}
                                            onChange={(e) => updateOptionExplanation(questionIndex, optionIndex, e.target.value)}
                                            labelClassName="text-xl font-semibold"
                                            className="bg-slate-50"
                                        />

                                        <div className="absolute top-2 right-4 flex space-x-2">
                                            <button
                                                type="button"
                                                onClick={() => toggleCorrectOption(questionIndex, optionIndex)}
                                                className={`text-sm p-1 rounded transition-all ${option.isCorrect
                                                        ? 'bg-lime-500 text-white'
                                                        : 'bg-slate-300 text-black'
                                                    }`}
                                            >
                                                {option.isCorrect ? 'Correct' : 'Mark Correct'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button
                type="submit"
                disabled={isLoading}
                className="flex justify-center items-center w-full p-2 bg-blue-500 rounded-xl text-xl font-semibold text-white hover:bg-blue-700 transition-all duration-300"
            >
                {isLoading ? "Saving..." : "Save Exam"}
            </button>
        </form>
    );
}