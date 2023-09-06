import { item, listUser, list } from "@/db";
import { and, eq } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

type Args = {
  itemId?: number;
  listId?: number;
}
export function isMember(args: Args, userId: number, db: PostgresJsDatabase): Promise<boolean> {

  if (!args.itemId && !args.listId) {
    throw Error("Missing itemId or listId to validate membership")
  }

  if (args.itemId) return isMemberItem(args.itemId, userId, db);
  if (args.listId) return isMemberList(args.listId, userId, db);
  return new Promise(_ => false);
}

async function isMemberItem(itemId: number, userId: number, db: PostgresJsDatabase): Promise<boolean> {
  const res = await db.select({ id: listUser.userId })
    .from(item)
    .leftJoin(list, eq(list.id, item.listId))
    .leftJoin(listUser, eq(listUser.listId, list.id))
    .where(and(eq(item.id, itemId), eq(listUser.userId, userId)))
    .groupBy(listUser.userId);
  return res.length > 0;
}

async function isMemberList(listId: number, userId: number, db: PostgresJsDatabase): Promise<boolean> {
  const res = await db.select({ id: listUser.userId })
    .from(listUser)
    .where(and(eq(listUser.listId, listId), eq(listUser.userId, userId)))
  return res.length > 0;
}

