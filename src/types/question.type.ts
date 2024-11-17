export type QuestionType = {
  id: string;
  examId: string;
  question: string;
  type: string;
  points: number;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;

  options: QuestionOptionType[];
}

export type QuestionOptionType = {
  id: string;
  questionId: string;
  optionText: string;
  isCorrect: boolean;
  explanation: string;
  createdAt: string;
  updatedAt: string;
}