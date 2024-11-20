export type CourseType = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  teacher: string;
  category: string;
  duration: number;
  level: CourseLevel;
  price: number;
  createdAt: string;
  updatedAt: string;
};

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export type CourseModuleType = {
  id: string;
  course: CourseType;
  title: string;
  description: string;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
};
