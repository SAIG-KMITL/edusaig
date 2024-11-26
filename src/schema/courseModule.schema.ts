import { z } from "zod";

export const createCourseModuleSchema = z.object({
  title:z.
    string()
    .min(1, "Title cannot be empty")
    .max(100, "Title is too long"),
  description: z.
    string()
    .min(1, "Description cannot be empty")
    .max(100, "Description is too long"),
  courseId: z.string(),
});

export const editCourseModuleSchema = z.object({
  title:z.
    string()
    .min(1, "Title cannot be empty")
    .max(100, "Title is too long"),
  description: z.
    string()
    .min(1, "Description cannot be empty")
    .max(100, "Description is too long"),
  courseId: z.string(),
  orderIndex: z.
    number()
    .min(1)
});
