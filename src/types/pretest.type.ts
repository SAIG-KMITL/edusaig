import { MetaType } from "./meta.type";
import { UserResponseType } from "./user.type";

export type PretestType = {
  id: string;
  user: UserResponseType | null;
  title: string;
  description: string;
  timeLimit: number;
  passingScore: number;
  maxAttempts: number;
  createdAt: string;
  updatedAt: string;
}

export type PretestsResponseType = {
  data: PretestType[];
  meta: MetaType;
}