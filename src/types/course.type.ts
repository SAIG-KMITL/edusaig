export type CourseType = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  teacher: string;
  category: string;
  duration: number;
  level: string;
  price: number;
  createdAt: string;
  updatedAt: string;
};

export type CourseModuleType = {
  id: string;
  courseId: string;
  title: string;
  description: string;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}