import { AnyColumn, SQL, asc, desc } from "drizzle-orm";
import { Sort_Dir } from "../types/graphql";

export function sortParse(column: AnyColumn, sortDir: Sort_Dir | undefined | null) {
  if (!sortDir) return undefined;

  if (sortDir === Sort_Dir.Asc) {
    return asc(column);
  } else {
    return desc(column);
  }
}

export function sortAll(arr: (SQL | undefined)[]): SQL[] {
  return arr.filter((x) => x !== undefined) as SQL[];
}
