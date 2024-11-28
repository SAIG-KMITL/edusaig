import { MetaType } from "./meta.type";
import { PretestType } from "./pretest.type";
import { QuestionOptionType, QuestionType } from "./question.type";
import { UserResponseType } from "./user.type";

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
};

export type ExamResponseType = {
  data: ExamType[];
  meta: MetaType;
};

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

export type ExamAnswerResponseType = {
  data: ExamAnswerType[];
  meta: MetaType;
};

export type ExamAttempt = {
  id: string;
  examId: string | null;
  pretestId: string | null;
  userId: string;
  score: number;
  status: string;
  startedAt: string;
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
};

export type ExamAttemptResponseType = {
  data: ExamAttempt[];
  meta: MetaType;
};

export type ExamAttemptPretestType = {
  id: string;
  pretest: PretestType;
  pretestId: string;
  user: UserResponseType;
  userId: string;
  score: string;
  status: string;
  startedAt: string;
  submittedAt: string;
};

export type ExamAttemptPretestResponseType = {
  data: ExamAttemptPretestType[];
  meta: MetaType;
};

export type ExamAnswerResponse = {
  id: string;
  examAttempt: ExamAttempt;
  question: QuestionType;
  selectedOption: QuestionOptionType;
  answerText: string;
  isCorrect: boolean;
  points: number;
  createdAt: string;
  updatedAt: string;
};
