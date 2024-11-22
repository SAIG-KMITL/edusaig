import exp from "constants";
import { z } from "zod";

export const createCourseModuleSchema = z.object({
  courseId: z.string(),
  title: z.string(),
  description: z.string(),
  orderIndex: z.number().nonnegative(),
  createdDate: z.string().optional(),
  updatedDate: z.string().optional(),
});

export const courseModuleSchema = z.object({
  id: z.string(),
  // courseId: z.string(),
  title: z.string(),
  description: z.string(),
  orderIndex: z.number().nonnegative(),
  createdAt: z.string(),
  updatedAt: z.string(),
});