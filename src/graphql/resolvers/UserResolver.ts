import { GraphQLError } from "graphql";
import { Context } from "../context";
import { QueryUsersArgs, User } from "../types/graphql";
import { hasValidToken } from "./authUtil";
import { CUSTOM_ERR, CUSTOM_ERR_MSGS } from "../errorCodes";

const resolver = {
  Query: {
    self: async (_parent: any, _args: any, ctx: Context): Promise<User> => {
      const payload = await hasValidToken();
      const user = await ctx.prisma.user.findUnique({
        where: { id: payload.id },
        select: {
          id: true,
          name: true,
        },
      });
      if (!user) {
        throw new GraphQLError(CUSTOM_ERR_MSGS.NO_USER, {
          extensions: { code: CUSTOM_ERR.NO_USER },
        });
      }
      return user;
    },
    users: async (
      _parent: any,
      args: QueryUsersArgs,
      ctx: Context
    ): Promise<User[]> => {
      return await ctx.prisma.user.findMany({
        where: {
          id: args.input.id ?? undefined,
          name: {
            equals: args.input.name ?? undefined,
            startsWith: args.input.filter?.startsWith ?? undefined,
            contains: args.input.filter?.contains ?? undefined,
          },
        },
      });
    },
  },
};

export default resolver;
