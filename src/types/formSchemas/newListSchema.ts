import { z } from "zod";

export const tagInputValidate = z
  .string({ required_error: "The tag name cannot be empty" })
  .max(30, "A tag cannot exceed 30 characters");

export const newListSchema = z.object({
  name: z
    .string({ required_error: "A name is required" })
    .max(30, "The name cannot exceed 30 characters"),
  tags: z.array(tagInputValidate).optional(),
});

export type NewListSchema = z.infer<typeof newListSchema>;
