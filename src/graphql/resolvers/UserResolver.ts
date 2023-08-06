import { Context } from "../context";
import { QueryUsersArgs, User } from "../types/graphql";
import { authorized, hasValidToken } from "./authUtil";

const resolver = {
  Query: {
    self: authorized(async (_p, _a, ctx, _i) => {
      return ctx.user;
    }),
    users: async (_parent: any, args: QueryUsersArgs, ctx: Context): Promise<User[]> => {
      return await ctx.prisma.user.findMany({
        where: {
          id: args.input.id ?? undefined,
          name: {
            equals: args.input.name ?? undefined,
            startsWith: args.input.filter?.startsWith ?? undefined,
            contains: args.input.filter?.contains ?? undefined,
          },
        },
        select: {
          name: true,
          id: true,
        },
      });
    },
  },
};

export default resolver;
