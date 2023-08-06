import { MutationCreateListArgs, QueryListArgs, QueryListsArgs } from "../types/graphql";
import { authorized } from "./authUtil";
import { nullsToUndefined } from "../util/parse";

const resolver = {
  Query: {
    lists: authorized<QueryListsArgs>(async (_p, args, ctx) => {
      return await ctx.prisma.list.findMany({
        where: {
          ListUser: {
            some: {
              user: {
                id: ctx.user.id,
              },
            },
          },
          name: nullsToUndefined(args.input?.filter?.name),
          createdOn: nullsToUndefined(args.input?.filter?.date),
        },
        take: args.input?.limit ?? undefined,
        orderBy: nullsToUndefined(args.input?.sort),
        select: {
          id: true,
          item: {
            where: {
              createdOn: nullsToUndefined(args.input?.item?.createdOn),
              name: nullsToUndefined(args.input?.item?.name),
            },
            select: {
              id: true,
              name: true,
              likes: true,
              createdOn: true,
              adder: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
    }),
    list: authorized<QueryListArgs>(async (_p, args, ctx) => {
      return await ctx.prisma.list.findMany({
        where: {
          ListUser: {
            some: {
              user: {
                id: ctx.user.id,
              },
            },
          },
          id: args.id,
        },
        select: {
          id: true,
          item: {
            select: {
              id: true,
              name: true,
              likes: true,
              createdOn: true,
              adder: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
    }),
  },
  Mutation: {
    createList: authorized<MutationCreateListArgs>(async (_p, args, ctx) => {
      return await ctx.prisma.list.create({
        data: {
          name: args.name,
          Tag: {
            createMany: {
              data:
                args.tags?.map((x) => {
                  return {
                    name: x,
                  };
                }) ?? [],
            },
          },
        },
        select: {
          id: true,
          name: true,
        },
      });
    }),
  },
};

export default resolver;
