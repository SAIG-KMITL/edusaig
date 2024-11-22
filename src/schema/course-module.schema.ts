import { z } from "zod";

export const courseModuleSchema = z.object({
  courseId: z.string(),
  title: z.string(),
  description: z.string(),
  orderIndex: z.number().nonnegative(),
  createdDate: z.string().optional(),
  updatedDate: z.string().optional(),
});