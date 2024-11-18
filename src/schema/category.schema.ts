import { z } from "zod"; 

export const CategorySchema = z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    createdDate: z.string().optional(),
    updatedDate: z.string().optional(),
});