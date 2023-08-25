import { tag } from "@/db";
import { Context } from "../context";
import { TagSearchInput } from "../types/graphql";
import { authorized } from "./authUtil";
import { eq } from "drizzle-orm";

const tagResolver = {
  Query: {
    tagSearch: authorized(async (_p, args: TagSearchInput, ctx: Context) => {
      return await ctx.db
        .select({ id: tag.id, name: tag.name })
        .from(tag)
        .where(eq(tag.listId, args.listId));
    }),
  },
};

export default tagResolver;
