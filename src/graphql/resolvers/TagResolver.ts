import { Context } from "../context";
import { TagSearchInput } from "../types/graphql";
import { authorized } from "./authUtil";

const tagResolver = {
  Query: {
    tagSearch: authorized(async (_p, args: TagSearchInput, ctx: Context) => {
      const result = await ctx.prisma.tag.findMany({
        where: {
            listId: args.listId,
        
        },
        take: 10,
      });
    }),
  },
};

export default tagResolver;
