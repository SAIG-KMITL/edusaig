import { z } from "zod";

export const createRewardSchema = z.object({
  name: z.
    string()
    .min(1, "Title cannot be empty")
    .max(100, "Title is too long"),
  description: z.
    string()
    .min(1, "Description cannot be empty")
    .max(100, "Description is too long"),
  type: z.
    string()
    .min(1, "Please select course type"),
  points: z.
    number()
    .min(0, "Points cannot be empty"),
  stock: z.
    number()
    .min(0, "Stock cannot be empty"),
  status: z.
    string()
    .min(1, "Please select course status"),
  thumbnailUrl: z.
    string().min(1, "Please select reward thumbnail") 
});

export const editRewardSchema = z.object({
  name: z.
    string()
    .min(1, "Title cannot be empty")
    .max(100, "Title is too long"),
  description: z.
    string()
    .min(1, "Description cannot be empty")
    .max(100, "Description is too long"),
  type: z.
    string()
    .min(1, "Please select course type"),
  points: z.
    number()
    .min(0, "Points cannot be empty"),
  stock: z.
    number()
    .min(0, "Stock cannot be empty"),
  status: z.
    string()
    .min(1, "Please select course status"),
});
