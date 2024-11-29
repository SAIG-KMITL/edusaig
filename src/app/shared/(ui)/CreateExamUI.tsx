"use client";

import { createExamAction } from "@/actions/examAction";
import { createQuestionAction } from "@/actions/questionAction";
import { createQuestionOptionAction } from "@/actions/questionOptionAction";
import InputTheme from "@/components/Inputs/InputTheme";
import { CreateQuestionOptionType } from "@/types/question.type";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

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

export default function CreateExamUI({ moduleId }: { moduleId: string }) {
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

    const incompleteOption = currentOptions.find(
      (opt) => !opt.optionText.trim()
    );
    if (incompleteOption) {
      alert("Please fill in all option texts");
      return;
    }

    const correctOption = currentOptions.find((opt) => opt.isCorrect);
    if (!correctOption) {
      alert("Please mark at least one option as correct");
      return;
    }

    const newQuestion: Question = {
      id: `question${questions.length + 1}`,
      question: currentQuestion,
      type: "multiple_choice",
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
      isCorrect: i === index,
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
      [newQuestions[index], newQuestions[index - 1]] = [
        newQuestions[index - 1],
        newQuestions[index],
      ];
      setQuestions(newQuestions);
    }
  };

  const moveQuestionDown = (index: number) => {
    if (index < questions.length - 1) {
      const newQuestions = [...questions];
      [newQuestions[index], newQuestions[index + 1]] = [
        newQuestions[index + 1],
        newQuestions[index],
      ];
      setQuestions(newQuestions);
    }
  };

  const createQuestion = async (
    question: Question,
    examId: string,
    index: number
  ) => {
    const response = await createQuestionAction({
      examId,
      question: question.question,
      type: question.type,
      points: question.points,
      orderIndex: index,
    });

    return response;
  };

  const createQuestionOption = async (option: CreateQuestionOptionType) => {
    const response = await createQuestionOptionAction(option);
    console.log(response);
  };

  const createExam = async () => {
    const response = await createExamAction({
      title,
      description,
      timeLimit: Number(timeLimit),
      passingScore,
      maxAttempts: 1,
      shuffleQuestions: false,
      status: "published",
      courseModuleId: moduleId,
    });

    if (response) {
      questions.forEach(async (question, index) => {
        if (response.data) {
          const questionResponse = await createQuestion(
            question,
            response.data.id,
            index + 1
          );
          if (questionResponse) {
            question.options.forEach(async (option) => {
              const optionResponse = await createQuestionOption({
                questionId: questionResponse.data?.id ?? "",
                optionText: option.optionText,
                isCorrect: option.isCorrect,
                explanation: option.explanation,
              });
              console.log(optionResponse);
            });
          }
        }
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-6 animate-gradient-shift"
    >
      <motion.div
        className="max-w-5xl mx-auto space-y-8"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-br from-royalPurple/20 to-darkMagenta/20 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-electricViolet/20">
          <motion.h1
            className="text-4xl font-bold text-white mb-8"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Create New Exam
          </motion.h1>

          <div className="space-y-6">
            <div className="space-y-4">
              <InputTheme
                placeholder="Exam Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                label="Exam Title"
              />
              <InputTheme
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                label="Description"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputTheme
                  type="number"
                  placeholder="Time Limit (minutes)"
                  label="Time Limit (minutes)"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(Number(e.target.value))}
                />
                <InputTheme
                  type="number"
                  placeholder="Passing Score (%)"
                  label="Passing Score (%)"
                  value={passingScore}
                  onChange={(e) => setPassingScore(Number(e.target.value))}
                />
              </div>
            </div>

            <motion.div
              className="bg-white/5 rounded-xl p-6 space-y-4 border border-electricViolet/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold text-white">
                Add Question
              </h2>

              <InputTheme
                placeholder="Question Text"
                value={currentQuestion}
                onChange={(e) => setCurrentQuestion(e.target.value)}
                label="Question Text"
              />

              <div className="space-y-4">
                {currentOptions.map((option, index) => (
                  <motion.div
                    key={option.id}
                    className="bg-white/10 rounded-lg p-4 w-full border border-skyBlue/30"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex flex-col md:flex-row gap-4 w-full">
                      <div className="flex-1">
                        <InputTheme
                          placeholder={`Option ${index + 1}`}
                          value={option.optionText}
                          onChange={(e) =>
                            updateOptionText(index, e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                      <div className="flex-1">
                        <InputTheme
                          placeholder="Explanation"
                          value={option.explanation}
                          onChange={(e) =>
                            updateOptionExplanation(index, e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                      <motion.button
                        className="p-2 rounded-lg text-white transition-colors flex-shrink-0"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <input
                          type="checkbox"
                          className="w-5 h-5 rounded accent-electricViolet"
                        />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}

                <motion.button
                  onClick={addQuestion}
                  className="w-full py-2 px-4 bg-oceanBlue/50 hover:bg-oceanBlue text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus size={20} />
                  <span>Add Option</span>
                </motion.button>
              </div>
            </motion.div>

            <motion.button
              onClick={createExam}
              className="w-full py-4 bg-electricViolet hover:bg-electricViolet/80 text-white rounded-xl font-semibold text-lg transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Create Exam
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
