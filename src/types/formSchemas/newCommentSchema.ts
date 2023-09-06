import { z } from "zod";

export const newCommentSchema = z.object({
  content: z
    .string({ required_error: "A comment cannot be empty" })
    .max(250, "A comment cannot exceed 250 characters"),
});

export type NewCommentSchema = z.infer<typeof newCommentSchema>;
