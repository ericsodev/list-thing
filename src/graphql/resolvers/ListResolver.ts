import {
    ListItemsArgs,
    ListTagsArgs,
    MutationCreateListArgs,
    MutationDeleteListArgs,
    QueryListArgs,
    QueryListsArgs,
} from "../types/graphql";
import { AuthedCtx, authorized } from "./authUtil";
import { GraphQLError } from "graphql";
import { item, list, listUser, tag, tagItem } from "@/db";
import { and, eq, inArray, sql } from "drizzle-orm";
import { opt } from "@/graphql/util/where";
import { whereDate, whereStr } from "../util/dbFilters";
import { sortAll, sortParse } from "../util/dbSort";

const resolver = {
    Query: {
        lists: authorized<QueryListsArgs>(async (_p, { input }, ctx) => {
            const res = await ctx.db
                .select({
                    id: list.id,
                    createdOn: list.createdOn,
                    slug: list.slug,
                    name: list.name,
                })
                .from(listUser)
                .leftJoin(list, eq(list.id, listUser.listId))
                .where(
                    and(
                        whereStr(list.name, input?.name),
                        whereDate(list.createdOn, input?.createdOn),

                        eq(listUser.userId, ctx.user.id),
                        opt(inArray, input?.role, listUser.role, input?.role!),
                    ),
                );
            return res;
        }),
        list: authorized<QueryListArgs>(async (_p, { slug, id }, ctx) => {
            if (slug === undefined && id === undefined) {
                throw new GraphQLError("Bad request. An id or slug is required");
            }
            const res = (
                await ctx.db
                    .select()
                    .from(list)
                    .where(and(opt(eq, id, list.id, id), opt(eq, slug, list.slug, slug)))
            )[0];
            return res;
        }),
    },
    Mutation: {
        createList: authorized<MutationCreateListArgs>(async (_p, args, ctx) => {
            const res = await ctx.db.transaction(async (tx) => {
                const listRes = await tx.insert(list).values({ name: args.name }).returning({
                    id: list.id,
                    createdOn: list.createdOn,
                    slug: list.slug,
                    name: list.name,
                });
                await tx
                    .insert(listUser)
                    .values({ listId: listRes[0].id, userId: ctx.user.id, role: "OWNER" });

                if (args.tags && args.tags.length > 0) {
                    await tx
                        .insert(tag)
                        .values(args.tags.map((tag) => ({ listId: listRes[0].id, name: tag })));
                }
                return listRes;
            });
            return res[0];
        }),
        deleteList: authorized<MutationDeleteListArgs>(async (_p, args, ctx) => {
            // delete if user is owner of the list
            await ctx.db.transaction(async (tx) => {
                const user = await tx
                    .select({ role: listUser.role })
                    .from(listUser)
                    .where(and(eq(listUser.listId, args.id), eq(listUser.userId, ctx.user.id)));
                if (!user[0] || user[0].role !== "OWNER") {
                    return;
                }

                // authorized to delete list
                await tx.delete(list).where(eq(list.id, args.id));
            });
            return true;
        }),
    },
    List: {
        tags: async (p: { id: number }, args: ListTagsArgs, ctx: AuthedCtx) => {
            // retrieve all tags given list id
            return await ctx.db
                .select({ id: tag.id, name: tag.name })
                .from(tag)
                .where(and(eq(tag.listId, p.id), whereStr(tag.name, args.name)));
        },
        memberCount: async (p: { id: number }, _: any, ctx: AuthedCtx) => {
            const res = await ctx.db
                .select({ memberCount: sql<number>`count(${listUser.userId})`.mapWith(Number) })
                .from(list)
                .where(eq(list.id, p.id))
                .leftJoin(listUser, eq(listUser.listId, list.id))
                .groupBy(sql`${list.id}`);
            return res[0].memberCount;
        },
        itemCount: async (p: { id: number }, _: any, ctx: AuthedCtx) => {
            const res = await ctx.db
                .select({ itemCount: sql<number>`count(${item.id})`.mapWith(Number) })
                .from(list)
                .where(eq(list.id, p.id))
                .leftJoin(item, eq(item.listId, list.id))
                .groupBy(sql`${list.id}`);

            return res[0].itemCount;
        },
        tagCount: async (p: { id: number }, _: any, ctx: AuthedCtx) => {
            const res = await ctx.db
                .select({ tagCount: sql<number>`count(${tag.id})`.mapWith(Number) })
                .from(list)
                .where(eq(list.id, p.id))
                .leftJoin(listUser, eq(tag.listId, list.id))
                .groupBy(sql`${list.id}`);
            return res[0].tagCount;
        },
        items: async (p: { id: number }, { sort, ...args }: ListItemsArgs, ctx: AuthedCtx) => {
            const res = await ctx.db
                .select({
                    id: item.id,
                    name: item.name,
                    status: item.status,
                    likes: item.likes,
                    createdOn: item.createdOn,
                })
                .from(item)
                .leftJoin(tagItem, eq(tagItem.itemId, item.id))
                .leftJoin(tag, eq(tagItem.tagId, tag.id))
                .where(
                    and(
                        eq(item.listId, p.id),
                        whereDate(item.createdOn, args.date),
                        whereStr(item.name, args.name),
                        opt(
                            inArray,
                            args.includesTags?.tags && args.includesTags?.tags.length > 0,
                            tag.name,
                            args.includesTags?.tags!,
                        ),
                    ),
                )
                .groupBy(item.id)
                .orderBy(
                    ...sortAll([
                        sortParse(item.name, sort?.name),
                        sortParse(item.createdOn, sort?.date),
                        sortParse(item.status, sort?.status),
                    ]),
                );
            return res;
        },
    },
};

export default resolver;
