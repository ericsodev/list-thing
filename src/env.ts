import { z } from "zod";
const envSchema = z.object({
  DATABASE_URL: z.string(),
  ACCESS_KEY: z.string(),
  REFRESH_KEY: z.string(),
});

export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  ACCESS_KEY: process.env.ACCESS_KEY,
  REFRESH_KEY: process.env.REFRESH_KEY,
});
