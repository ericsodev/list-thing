import { user } from "@/db";
import { Context } from "../context";
import { QueryUsersArgs, User } from "../types/graphql";
import { authorized } from "./authUtil";
import { and, eq, ilike, or } from "drizzle-orm";
import { opt } from "../util/where";

const resolver = {
  Query: {
    self: authorized(async (_p, _a, ctx, _i) => {
      return ctx.user;
    }),
    users: async (
      _parent: any,
      { input: { name, id } }: QueryUsersArgs,
      ctx: Context,
    ): Promise<User[]> => {
      return await ctx.db
        .select({ id: user.id, name: user.name })
        .from(user)
        .where(
          and(
            opt(eq, id, user.id, id!),
            or(
              opt(eq, name?.equals, user.name, name?.equals!),
              opt(ilike, name?.startsWith, user.name, `${name?.startsWith!}%`),
              opt(ilike, name?.contains, user.name, `%${name?.contains!}%`),
            ),
          ),
        )
        .limit(30);
    },
  },
};

export default resolver;
