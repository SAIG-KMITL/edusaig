import { z } from "zod";

export const createCourseSchema = z.object({
  title: z.
    string()
    .min(1, "Title cannot be empty")
    .max(100, "Title is too long"),
  description: z.
  string()
  .min(1, "Description cannot be empty")
  .max(100, "Description is too long"),
  categoryId: z.
  string()
  .min(1, "Please select course category"),
  duration: z.number().min(0),
  level: z.
  string()
  .min(1, "Please select course level"),
  price: z.number().min(0),
  status: z.
  string()
  .min(1, "Please select course status"),
  thumbnailUrl: z.
  string().min(1, "Please select course thumbnail") 
});

export const editCourseSchema = z.object({
  title: z.
    string()
    .min(1, "Title cannot be empty")
    .max(100, "Title is too long"),
  description: z.
  string()
  .min(1, "Description cannot be empty")
  .max(100, "Description is too long"),
  categoryId: z.
  string()
  .min(1, "Please select course category"),
  duration: z.number().min(0),
  level: z.
  string()
  .min(1, "Please select course level"),
  price: z.number().min(0),
  status: z.
  string()
  .min(1, "Please select course status"),
  thumbnailKey: z.
    string()
    .min(1, "Please select course thumbnail"),
});
