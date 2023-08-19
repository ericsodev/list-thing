import { AddItemInput, MutationAddItemArgs } from "../types/graphql";
import { authorized } from "./authUtil";

const resolver = {
  Mutation: {
    addItem: authorized(async (_p, { input: args }: MutationAddItemArgs, ctx, _i) => {
      let tags = await ctx.prisma.$transaction(
        (args.tags || []).map((tag) =>
          ctx.prisma.tag.upsert({
            where: {
              name_listId: {
                name: tag,
                listId: args.listId,
              },
            },
            create: {
              name: tag,
              listId: args.listId,
            },
            update: {},
            select: {
              id: true,
            },
          }),
        ),
      );
      return await ctx.prisma.item.create({
        data: {
          name: args.name,
          list: {
            connect: {
              id: args.listId,
            },
          },
          adder: {
            connect: {
              id: ctx.user.id,
            },
          },
          ItemTag: {
            createMany: {
              data: tags.map((tag) => ({ tagId: tag.id })),
            },
          },
        },
      });
    }),
  },
};

export default resolver;
