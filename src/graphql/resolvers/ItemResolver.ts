import { MutationAddItemArgs } from "../types/graphql";
import { authorized } from "./authUtil";
import { item, tag, tagItem } from "@/db";
import { sql } from "drizzle-orm";

const resolver = {
  Mutation: {
    addItem: authorized(async (_p, { input }: MutationAddItemArgs, ctx, _i) => {
      return await ctx.db.transaction(async (tx) => {
        // create any tags that don't exist in the list
        if (input.tags) {
          await tx.insert(tag).values(
            input.tags.map((tag) => ({
              name: tag,
              listId: input.listId,
            })),
          );
        }

        // create item
        const itemInsert = (
          await tx
            .insert(item)
            .values({ listId: input.listId, name: input.name })
            .returning({ id: item.id })
        )[0];

        // create rows in tagItem junction table
        if (input.tags) {
          const sqlConnectTagItem = sql`INSERT INTO ${tagItem} (${tagItem.itemId}, ${
            tagItem.tagId
          }) SELECT ${tag.name}, '${itemInsert.id}' FROM ${tag} WHERE ${
            tag.name
          } IN (${input.tags.join(", ")})`;
          await tx.execute(sqlConnectTagItem);
        }

        // return item id
        return itemInsert.id;
      });
      // create items and connect to tags

      // let tags = await ctx.prisma.$transaction(
      //   (args.tags || []).map((tag) =>
      //     ctx.prisma.tag.upsert({
      //       where: {
      //         name_listId: {
      //           name: tag,
      //           listId: args.listId,
      //         },
      //       },
      //       create: {
      //         name: tag,
      //         listId: args.listId,
      //       },
      //       update: {},
      //       select: {
      //         id: true,
      //       },
      //     }),
      //   ),
      // );

      // create item and link tags
      // return await ctx.prisma.item.create({
      //   data: {
      //     name: args.name,
      //     list: {
      //       connect: {
      //         id: args.listId,
      //       },
      //     },
      //     adder: {
      //       connect: {
      //         id: ctx.user.id,
      //       },
      //     },
      //     ItemTag: {
      //       createMany: {
      //         data: tags.map((tag) => ({ tagId: tag.id })),
      //       },
      //     },
      //   },
      // });
    }),
  },
};

export default resolver;
