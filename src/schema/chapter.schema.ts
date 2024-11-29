import { z } from "zod";

export const createChapterSchema = z.object({
  title: z.
    string()
    .min(1, "Title cannot be empty")
    .max(100, "Title is too long"),
  description: z.
    string()
    .min(1, "Description cannot be empty")
    .max(100, "Description is too long"),
  content: z.
    string()
    .min(1, "Content cannot be empty")
    .max(100, "Content is too long"),
  duration: z.number().min(0),
  moduleId: z.
    string()
    .min(1, "Please select module"),
  isPreview: z.
    boolean(),
  videoUrl: z.
    string()
    .min(1, "Please select video")
});

export const editChapterSchema = z.object({
  title: z.
    string()
    .min(1, "Title cannot be empty")
    .max(100, "Title is too long"),
  description: z.
    string()
    .min(1, "Description cannot be empty")
    .max(100, "Description is too long"),
  content: z.
    string()
    .min(1, "Content cannot be empty")
    .max(100, "Content is too long"),
  summary: z.
  string()
    .min(1, "Summary cannot be empty")
    .max(100, "Summary is too long"),
  duration: z.number().min(0),
  moduleId: z.
    string()
    .min(1, "Please select module"),
  isPreview: z.boolean(),
});
