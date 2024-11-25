import { CategoryType } from "./category";

export type CourseType = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  teacher: string;
  category: string;
  duration: number;
  level: CourseLevelType;
  price: number;
  createdAt: string;
  updatedAt: string;
};

export type CourseLevelType = 'beginner' | 'intermediate' | 'advanced';

export type CourseStatusType = 'draft' | 'published' | 'archived';

export type CourseModuleType = {
  id: string;
  course: CourseType;
  title: string;
  description: string;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
};

export type CourseResponseType = {
  id: string;
  title: string;
  description: string;
  teacher: TeacherResponseType;
  category: CategoryType;
  duration: number;
  level: CourseLevelType;
  price: number;
  status: CourseStatusType;
  createdAt: string;
  updatedAt: string;
}

export type CourseModuleResponseType = {
  id: string;
  title: string;
  description: string;
  orderIndex: number;
  courseId: string;
  createdAt: string;
  updatedAt: string;
  course: {
    id: string;
    title: string;
    description: string;
    thumbnailKey: string;
    duration: number;
    level: CourseLevelType;
    price: number;
    status: CourseStatusType;
    createdAt: string;
    updatedAt: string;
  }
}

export type TeacherResponseType = {
  id: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  fullname: string;
}
