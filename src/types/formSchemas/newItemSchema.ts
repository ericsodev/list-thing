import { z } from "zod";
import { tagInputValidate } from "./newListSchema";

export const newItemSchema = z.object({
  name: z
    .string({ required_error: "An item requires a name" })
    .max(50, "Item name must be maximum of 50 characters"),
  tags: z.array(tagInputValidate),
});

export type NewItemSchema = z.infer<typeof newItemSchema>;
