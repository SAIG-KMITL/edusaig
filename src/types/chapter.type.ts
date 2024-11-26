import { MetaType } from "./meta.type";

export type ChapterType = {
  id: string;
  courseModuleId: string;
  title: string;
  description: string;
  videoUrl: string;
  content: string;
  summary: string;
  duration: number;
  orderIndex: number;
  isPreview: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ChapterResponseType = {
  title: string;
  description: string;
  moduleId: string;
  content: string;
  summary: string;
  duration: number;
  orderIndex: number;
  isPreview: boolean;
  videoKey: string | null;
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type ChaptersResponseType = {
  data: ChapterResponseType[];
  meta: MetaType;
}
