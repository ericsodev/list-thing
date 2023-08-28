export * from "./schema";
import { env } from "@/env";
import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { readFileSync } from "fs";
import postgres from "postgres";

// for query purposes

const queryClient = postgres(env.DATABASE_URL, {
  max: 1,
  ssl: {
    ca: readFileSync(env.DATABASE_SSL_PATH).toString(),
  },
});
export const db: PostgresJsDatabase = drizzle(queryClient);
