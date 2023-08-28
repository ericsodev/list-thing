import { SQL } from "drizzle-orm";

// export function opt<T>(v: unknown, sql: SQL<T>): SQL<T> | undefined {
//   return v === undefined || v === null ? undefined : sql;
// }

export function opt<T extends (...a: any[]) => SQL>(
  fn: T,
  condition: any,
  ...args: Parameters<T>
): SQL | undefined {
  if (!condition) return undefined;
  return fn(...args);
}
