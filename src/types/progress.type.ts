import { ChapterResponseType } from "./chapter.type";
import { EnrollmentResponseType } from "./enrollment.type";
import { MetaType } from "./meta.type";

export type ProgressResponseType = {
  id: string;
  enrollment: EnrollmentResponseType;
  chapter: ChapterResponseType;
  status: ProgressStatusType;
  watchTime: number;
  lastAccessedAt: string;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export type ProgressStatusType = "active" | "completed" | "dropped";

export type ProgressesResponseType = {
  data: ProgressResponseType[];
  meta: MetaType;
}