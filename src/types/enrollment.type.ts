import { CourseType } from "./course.type";
import { MetaType } from "./meta.type";
import { UserResponseType } from "./user.type";

export type EnrollmentResponseType = {
  id: string;
  user: UserResponseType;
  course: CourseType;
  status: EnrollmentStatusType;
  completionRate: number;
  certificateIssued: boolean;
  enrolledAt: string;
  completedAt: string | null;
}

export type EnrollmentStatusType = "active" | "completed" | "dropped";

export type EnrollmentsResponseType = {
  data: EnrollmentResponseType[];
  meta: MetaType;
}