import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string({ required_error: "A username is required" })
    .max(30, "Your username  cannot exceed 30 characters")
    .refine(
      (user) => user.match(/^\S+$/)?.length === 1,
      "Your username cannot contain whitespace"
    ),
  password: z
    .string({ required_error: "A password is required" })
    .min(2, "Your password must be at least 8 characters long."),
});

export type User = z.infer<typeof userSchema>;
