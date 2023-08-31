import { opt } from "./where";
import type { DateFilter, StringFilter } from "../types/graphql";
import { AnyColumn, and, eq, gt, gte, ilike, lt, lte } from "drizzle-orm";

export function whereStr(value: AnyColumn, filter: StringFilter | undefined | null) {
  if (!filter) return undefined;
  return and(
    opt(eq, filter.equals, value, filter.equals),
    opt(ilike, filter.startsWith, value, `${filter.startsWith}%`),
    opt(ilike, filter.contains, value, `%${filter.contains}%`),
  );
}

export function whereDate(value: AnyColumn, filter: DateFilter | undefined | null) {
  if (!filter) return undefined;
  return and(
    opt(eq, filter.equals, value, filter.equals),
    opt(gt, filter.gt, value, filter.gt),
    opt(gte, filter.gte, value, filter.gte),
    opt(lt, filter.lt, value, filter.lt),
    opt(lte, filter.lte, value, filter.lte),
  );
}
