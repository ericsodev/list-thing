import { user } from "@/db";
import { Context } from "../context";
import { QueryUsersArgs, User } from "../types/graphql";
import { authorized, hasValidToken } from "./authUtil";
import { AnyColumn, SQL, and, eq, like, or } from "drizzle-orm";

function opt<T>(v: unknown, sql: SQL<T>): SQL<T> | undefined {
  return v === undefined || v === null ? undefined : sql;
}

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
            opt(id, eq(user.id, id!)),
            or(
              opt(name?.equals, eq(user.name, name?.equals!)),
              opt(name?.startsWith, like(user.name, `${name?.startsWith!}%`)),
              opt(name?.contains, like(user.name, `%${name?.contains!}%`)),
            ),
          ),
        )
        .limit(30);
      //   return await ctx.db
      //     .select({ id: user.id, name: user.name })
      //     .from(user)
      //     .where(or(eq(user.name, input.filter?.equals || ""), like("")));
      // return await ctx.prisma.user.findMany({
      //   where: {
      //     id: args.input.id ?? undefined,
      //     name: {
      //       equals: args.input.name ?? undefined,
      //       startsWith: args.input.filter?.startsWith ?? undefined,
      //       contains: args.input.filter?.contains ?? undefined,
      //     },
      //   },
      //   select: {
      //     name: true,
      //     id: true,
      //   },
      // });
    },
  },
};

export default resolver;
