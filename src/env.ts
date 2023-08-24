import { z } from "zod";
const envSchema = z.object({
  DATABASE_URL: z.string(),
  DATABASE_SSL_PATH: z.string(),
  ACCESS_KEY: z.string(),
  REFRESH_KEY: z.string(),
  REFRESH_EXP: z.string(),
  ACCESS_EXP: z.string(),
});

export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  ACCESS_KEY: process.env.ACCESS_KEY,
  REFRESH_KEY: process.env.REFRESH_KEY,
  REFRESH_EXP: process.env.REFRESH_EXP ?? "14d",
  ACCESS_EXP: process.env.ACCESS_EXP ?? "20m",
});
