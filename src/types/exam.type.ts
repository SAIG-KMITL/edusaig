import { QuestionType } from "./question.type";

export type ExamType = {
  id: string;
  courseModuleId: string;
  title: string;
  description: string;
  timeLimit: string;
  passingScore: number;
  maxAttempts: number;
  shuffleQuestions: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;

  questions: QuestionType[];
}

export type ExamAnswerType = {
  id: string;
  examAttemptId: string;
  questionId: string;
  selectedOptionId: string;
  answerText: string;
  isCorrect: boolean;
  points: number;
  createdAt: string;
  updatedAt: string;
};

export type ExamAttempt = {
  id: string;
  examId: string;
  userId: string;
  score: number;
  status: string;
  startedAt: string;
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}
