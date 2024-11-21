import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(4, "Username must be at least 3 characters")
    .max(100, "User Name is too long"),
  fullname: z
    .string()
    .min(4, "Fullname must be at least 3 characters")
    .max(100, "Fullname is too long"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password is too long"),
  role: z
    .string()
});
