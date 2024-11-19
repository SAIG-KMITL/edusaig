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
