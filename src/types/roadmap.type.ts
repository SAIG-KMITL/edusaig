import { CourseType } from "./course.type";
import { MetaType } from "./meta.type";
import { UserResponseType } from "./user.type";

export type RoadMapType = {
  id: string;
  duration: string;
  priority: number;
  user: UserResponseType;
  courses: CourseType[];
  createdAt: string;
  updatedAt: string;
};

export type RoadMapResponseType = {
  data: RoadMapType[];
  meta: MetaType;
};
