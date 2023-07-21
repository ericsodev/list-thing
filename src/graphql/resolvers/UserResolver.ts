import { GraphQLError } from "graphql";
import { Context } from "../context";
import { verifyAccessToken } from "../util/token";
import { QueryUsersArgs, User } from "../types/graphql";

const resolver = {
  Query: {
    self: async (_parent: any, _args: any, ctx: Context): Promise<User> => {
      if (!ctx.req.headers.authorization) {
        throw new GraphQLError("No token found", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      const payload = await verifyAccessToken(ctx.req.headers.authorization);
      if (!payload) {
        throw new GraphQLError("No token found", {
          extensions: { code: "UNAUTHORIZED" },
        });
      }
      await verifyAccessToken(ctx.req.headers.authorization);
      const user = await ctx.prisma.user.findUnique({
        where: { id: payload.id },
        select: {
          id: true,
          name: true,
        },
      });
      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: { code: "FORBIDDEN" },
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
