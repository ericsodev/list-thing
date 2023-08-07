import {
  MutationCreateListArgs,
  MutationDeleteListArgs,
  QueryListArgs,
  QueryListsArgs,
} from "../types/graphql";
import { authorized } from "./authUtil";
import { nullsToUndefined } from "../util/parse";

const resolver = {
  Query: {
    lists: authorized<QueryListsArgs>(async (_p, args, ctx) => {
      let result = await ctx.prisma.list.findMany({
        where: {
          ListUser: {
            some: {
              userId: ctx.user.id,
            },
          },
          name: nullsToUndefined(args.input?.filter?.name),
          createdOn: nullsToUndefined(args.input?.filter?.date),
        },
        take: args.input?.limit ?? undefined,
        orderBy: nullsToUndefined(args.input?.sort),
        select: {
          id: true,
          name: true,
          createdOn: true,
          _count: {
            select: {
              ListUser: true,
              item: true,
              Tag: true,
            },
          },
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
      return result.map((l) => ({
        ...l,
        memberCount: l._count.ListUser,
        itemCount: l._count.item,
        tagCount: l._count.Tag,
      }));
    }),
    list: authorized<QueryListArgs>(async (_p, args, ctx) => {
      return await ctx.prisma.list.findMany({
        where: {
          ListUser: {
            some: {
              userId: ctx.user.id,
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
          ListUser: {
            create: {
              role: "OWNER",
              user: {
                connect: {
                  id: ctx.user.id,
                },
              },
            },
          },
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
    deleteList: authorized<MutationDeleteListArgs>(async (_p, args, ctx) => {
      const res = await ctx.prisma.list.deleteMany({
        where: {
          id: args.id,
          ListUser: {
            some: {
              AND: {
                userId: ctx.user.id,
                role: "OWNER",
              },
            },
          },
        },
      });
      return res.count > 0;
    }),
  },
};

export default resolver;
