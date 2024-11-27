"use client";

import { useEffect, useState } from "react";
import Input from "@/components/Inputs/Input";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";

type QuestionOption = {
  id: string;
  optionText: string;
  isCorrect: boolean;
  explanation: string;
};

type Question = {
  id: string;
  question: string;
  type: string;
  points: number;
  options: QuestionOption[];
};

export default function CreateExamUI() {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [questions, setQuestions] = useState<Question[]>([]);
    const [timeLimit, setTimeLimit] = useState<number>(0);
    const [passingScore, setPassingScore] = useState<number>(0);

    const [currentQuestion, setCurrentQuestion] = useState<string>("");
    const [currentPoints, setCurrentPoints] = useState<number>(10);
    const [currentOptions, setCurrentOptions] = useState<QuestionOption[]>([
        { id: "option1", optionText: "", isCorrect: false, explanation: "" },
        { id: "option2", optionText: "", isCorrect: false, explanation: "" },
        { id: "option3", optionText: "", isCorrect: false, explanation: "" },
        { id: "option4", optionText: "", isCorrect: false, explanation: "" },
    ]);

    const addQuestion = () => {
        if (!currentQuestion.trim()) {
            alert("Please enter a question");
            return;
        }

        const incompleteOption = currentOptions.find(opt => !opt.optionText.trim());
        if (incompleteOption) {
            alert("Please fill in all option texts");
            return;
        }

        const correctOption = currentOptions.find(opt => opt.isCorrect);
        if (!correctOption) {
            alert("Please mark at least one option as correct");
            return;
        }

        const newQuestion: Question = {
            id: `question${questions.length + 1}`,
            question: currentQuestion,
            type: "multiple-choice",
            points: currentPoints,
            options: currentOptions.map((opt, index) => ({
                ...opt,
                id: `option${questions.length + 1}${String.fromCharCode(97 + index)}`,
                questionId: `question${questions.length + 1}`,
            })),
        };

        setQuestions([...questions, newQuestion]);
        
        setCurrentQuestion("");
        setCurrentPoints(10);
        setCurrentOptions([
            { id: "option1", optionText: "", isCorrect: false, explanation: "" },
            { id: "option2", optionText: "", isCorrect: false, explanation: "" },
            { id: "option3", optionText: "", isCorrect: false, explanation: "" },
            { id: "option4", optionText: "", isCorrect: false, explanation: "" },
        ]);
    };

    const updateQuestionPoints = (index: number, points: number) => {
        const newQuestions = [...questions];
        newQuestions[index].points = points;
        setQuestions(newQuestions);
    };

    const deleteQuestion = (indexToRemove: number) => {
        setQuestions(questions.filter((_, index) => index !== indexToRemove));
    };

    const updateOptionText = (index: number, text: string) => {
        const updatedOptions = [...currentOptions];
        updatedOptions[index].optionText = text;
        setCurrentOptions(updatedOptions);
    };

    const toggleOptionCorrect = (index: number) => {
        const updatedOptions = currentOptions.map((opt, i) => ({
            ...opt,
            isCorrect: i === index
        }));
        setCurrentOptions(updatedOptions);
    };

    const updateOptionExplanation = (index: number, explanation: string) => {
        const updatedOptions = [...currentOptions];
        updatedOptions[index].explanation = explanation;
        setCurrentOptions(updatedOptions);
    };

    const moveQuestionUp = (index: number) => {
        if (index > 0) {
            const newQuestions = [...questions];
            [newQuestions[index], newQuestions[index - 1]] = [newQuestions[index - 1], newQuestions[index]];
            setQuestions(newQuestions);
        }
    };

    const moveQuestionDown = (index: number) => {
        if (index < questions.length - 1) {
            const newQuestions = [...questions];
            [newQuestions[index], newQuestions[index + 1]] = [newQuestions[index + 1], newQuestions[index]];
            setQuestions(newQuestions);
        }
    };

    useEffect(() => {
        console.log(questions);
    }, [questions]);

    return (
        <div className="flex flex-col space-y-4 container my-4 lg:my-8 mx-auto p-4 lg:p-8 rounded-3xl bg-slate-100 bg-opacity-5 backdrop-blur-md">
            <h2 className="text-4xl text-slate-50 font-semibold">Create your Exam!</h2>
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
            
            <div className="space-y-4">
                <h2 className="text-4xl text-slate-50 font-semibold">Create a Question!</h2>
            
                <Input
                    type="text"
                    label="Question"
                    placeholder="Enter your question"
                    value={currentQuestion}
                    onChange={(e) => setCurrentQuestion(e.target.value)}
                    labelClassName="text-xl text-slate-50 font-semibold"
                    className="bg-slate-50"
                />

                <Input
                    type="number"
                    label="Points"
                    placeholder="Enter points for this question"
                    value={currentPoints}
                    onChange={(e) => setCurrentPoints(Number(e.target.value))}
                    labelClassName="text-xl text-slate-50 font-semibold"
                    className="bg-slate-50"
                    min={1}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentOptions.map((option, index) => (
                    <div 
                    key={index} 
                    className="bg-slate-200 rounded-xl p-4 space-y-2"
                    >
                    <Input
                        type="text"
                        label={`Option ${index + 1}`}
                        placeholder={`Enter option ${index + 1}`}
                        value={option.optionText}
                        onChange={(e) => updateOptionText(index, e.target.value)}
                        labelClassName="text-xl font-semibold"
                        className="bg-slate-50"
                    />
                    <Input
                        type="text"
                        label="Explanation"
                        placeholder="Enter explanation"
                        value={option.explanation}
                        onChange={(e) => updateOptionExplanation(index, e.target.value)}
                        labelClassName="text-xl font-semibold"
                        className="bg-slate-50"
                    />
                    <div className="flex items-center space-x-2">
                        <Input
                        type="checkbox"
                        checked={option.isCorrect}
                        onChange={() => toggleOptionCorrect(index)}
                        className="scale-125"
                        />
                        <span className="text-md font-semibold text-slate-500">Mark as Correct Answer</span>
                    </div>
                    </div>
                ))}
                </div>

                <button
                    type="button"
                    onClick={addQuestion}
                    className="w-full p-2 bg-green-500 rounded-xl text-xl font-semibold text-white hover:bg-green-700 transition-all"
                >
                    Add Question
                </button>
            </div>

            {questions.length > 0 && (
                <div className="space-y-4">
                <h2 className="text-2xl text-slate-50 font-semibold">Created Questions</h2>
                    {questions.map((q, index) => (
                        <div key={q.id} className="relative p-4 bg-slate-50 rounded-xl">
                            <div className="flex justify-between items-start space-x-4">
                                <div className="flex-grow flex-col space-y-2">
                                    <div className="flex flex-col items-start space-y-2">
                                        <p className="text-xl font-semibold text-black">{q.question}</p>
                                        <div className="flex justify-start items-center space-x-4">
                                            <Input
                                                type="number"
                                                value={q.points}
                                                onChange={(e) => updateQuestionPoints(index, Number(e.target.value))}
                                                className="bg-slate-200 text-black"
                                                min={1}
                                            />
                                            <p className="text-md text-slate-500">points</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        {q.options.map((opt, optIndex) => (
                                        <div 
                                            key={opt.id} 
                                            className={`p-2 rounded text-lg text-black ${opt.isCorrect ? 'bg-green-100' : 'bg-slate-300'}`}
                                        >
                                            <p className={`${opt.isCorrect ? "text-green-700": "text-black"}`}>{opt.optionText}</p>
                                        </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-2">
                                    {index > 0 && (
                                        <button 
                                            onClick={() => moveQuestionUp(index)}
                                            className="p-1 bg-blue-500 hover:bg-purple-500 rounded transition-all duration-300"
                                        >
                                        <ChevronUp />
                                        </button>
                                    )}
                                    {index < questions.length - 1 && (
                                        <button 
                                            onClick={() => moveQuestionDown(index)}
                                            className="p-1 bg-blue-500 hover:bg-purple-500 rounded transition-all duration-300"
                                        >
                                        <ChevronDown />
                                        </button>
                                    )}
                                    <button 
                                        onClick={() => deleteQuestion(index)}
                                        className="p-1 text-red-500 hover:text-slate-50 hover:bg-red-500 rounded transition-all duration-300"
                                    >
                                        <Trash2 />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {questions.length > 0 && (
                <button
                type="button"
                className="w-full p-2 bg-blue-500 text-xl font-semibold text-white rounded-xl hover:bg-blue-700 transition-all duration-300"
                >
                Create Exam
                </button>
            )}
        </div>
    );
}