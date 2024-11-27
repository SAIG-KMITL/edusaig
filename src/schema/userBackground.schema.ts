import { z } from "zod";

export const createUserBackgroundSchema = z.object({
  userId: z.string(),
  occupationId: z.
    string()
    .min(1, "Please select your career path"),
  topic: z.
    string()
    .min(1, "Please select skill"),
  level: z.
    string()
    .min(1, "Please select expertise level")
});
