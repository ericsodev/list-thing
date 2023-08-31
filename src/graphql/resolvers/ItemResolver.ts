import { MutationAddItemArgs } from "../types/graphql";
import { AuthedCtx, authorized } from "./authUtil";
import { item, tag, tagItem } from "@/db";
import { and, eq, sql } from "drizzle-orm";

const resolver = {
    Mutation: {
        addItem: authorized(async (_p, { input }: MutationAddItemArgs, ctx, _i) => {
            return await ctx.db.transaction(async (tx) => {
                // create any tags that don't exist in the list
                if (input.tags && input.tags.length > 0) {
                    await tx
                        .insert(tag)
                        .values(
                            input.tags.map((tag) => ({
                                name: tag,
                                listId: input.listId,
                            })),
                        )
                        .onConflictDoNothing();
                }

                // create item
                const itemInsert = (
                    await tx
                        .insert(item)
                        .values({ listId: input.listId, name: input.name })
                        .returning({ id: item.id })
                )[0];

                // create rows in tagItem junction table
                if (input.tags && input.tags.length > 0) {
                    const tagStr = input.tags.map((x) => `'${x}'`).join(",");
                    const sqlConnectTagItem = sql.raw(`
                      INSERT INTO tag_to_item (item_id, tag_id) 
                      SELECT ${itemInsert.id}, tag.id FROM tag 
                      WHERE tag.name IN (${tagStr})`);

                    await tx.execute(sqlConnectTagItem);
                }

                // return item id
                return itemInsert.id;
            });
        }),
    },
    Item: {
        tags: async (p: { id: number }, _: any, ctx: AuthedCtx) => {
            const res = await ctx.db
                .select({ id: tag.id, name: tag.name })
                .from(tagItem)
                .leftJoin(tag, eq(tagItem.tagId, tag.id))
                .where(eq(tagItem.itemId, p.id));
            return res;
        },
    },
};

export default resolver;
