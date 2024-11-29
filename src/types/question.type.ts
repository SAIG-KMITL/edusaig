import { MetaType } from "./meta.type";

export type QuestionType = {
  id: string;
  examId: string | null;
  pretestId: string | null;
  question: string;
  type: string;
  points: number;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;

  options: QuestionOptionType[];
};

export type QuestionOptionType = {
  id: string;
  questionId: string;
  optionText: string;
  isCorrect: boolean;
  explanation: string;
  createdAt: string;
  updatedAt: string;
};

export type PreTestQuestionResponseType = {
  data: QuestionType[];
  meta: MetaType;
};

export type PreTestQuestionOptionsResponseType = {
  data: QuestionOptionType[];
  meta: MetaType;
};

export type CreateQuestionType = {
  examId: string;
  question: string;
  type: string;
  points: number;
  orderIndex: number;
};

export type CreateQuestionOptionType = {
  questionId: string;
  optionText: string;
  isCorrect: boolean;
  explanation: string;
};