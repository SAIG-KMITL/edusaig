import { CategoryType } from "./category";
import { MetaType } from "./meta.type";
import { UserResponseType } from "./user.type";

export type CourseType = {
  id: string;
  title: string;
  description: string;
  thumbnailKey: string;
  teacher: UserResponseType;
  category: CategoryType;
  duration: number;
  level: CourseLevel;
  price: number;
  createdAt: string;
  updatedAt: string;
};

export type CourseLevel = "beginner" | "intermediate" | "advanced";

export type CourseModuleType = {
  id: string;
  course: CourseType;
  title: string;
  description: string;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
};

export type CoursesResponseType = {
  data: CourseType[];
  meta: MetaType;
};
