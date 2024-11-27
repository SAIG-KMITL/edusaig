import { MetaType } from "./meta.type";

export type UserBackgroundTopicResponseType = {
  id: string;
  title: string;
  description: string;
  level: UserBackgroundTopicLevelType;
  createdAt: string;
  updatedAt: string;
}

export type UserBackgroundTopicLevelType = "beginner" | "intermediate" | "advanced";

export type UserBackgroundTopicsResponseType = {
  data: UserBackgroundTopicResponseType[];
  meta: MetaType;
}