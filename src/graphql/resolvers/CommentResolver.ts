import { comment, item, list, listUser, user } from "@/db";
import { MutationAddCommentArgs, QueryGetCommentsArgs } from "../types/graphql";
import { authorized } from "./authUtil";
import { and, asc, eq } from "drizzle-orm";
import { AuthedCtx } from "./authUtil";
import { isMember } from "./listAuthUtil";

const resolver = {
    Query: {
        getComments: authorized<QueryGetCommentsArgs>(async (_p, args, ctx) => {
            try {
                // verify user is a member of the list
                if (!(await isMember({ itemId: args.itemId }, ctx.user.id, ctx.db))) return null;

                // get comments
                return await ctx.db.select({ id: comment.id, text: comment.text, createdOn: comment.createdOn })
                    .from(comment)
                    .where(eq(comment.itemId, args.itemId))
                    .orderBy(asc(comment.createdOn))

            } catch (e) {
                return null;
            }
        }),
    },
    Mutation: {
        addComment: authorized<MutationAddCommentArgs>(async (_p, args, ctx) => {
            try {
                const ret = await ctx.db.transaction(async (tx) => {
                    // verify user is a member of the list
                    const res = await tx
                        .select({ userId: listUser.userId })
                        .from(item)
                        .leftJoin(list, eq(list.id, item.listId))
                        .leftJoin(listUser, eq(list.id, listUser.listId))
                        .where(and(eq(item.id, args.itemId), eq(listUser.userId, ctx.user.id)))
                        .groupBy(listUser.userId);

                    if (res.length === 0) {
                        return null;
                    }

                    // create comment
                    return (await tx
                        .insert(comment)
                        .values({ itemId: args.itemId, text: args.content, userId: ctx.user.id })
                        .returning({
                            id: comment.id,
                            text: comment.text,
                            createdOn: comment.createdOn,
                        }))[0];
                });

                return ret;
            } catch (e) {
                return null;
            }
        }),
    },
    Comment: {
        adder: authorized(async (p: { id: number }, _args, ctx: AuthedCtx) => {
            const res = await ctx.db.select({ id: user.id, name: user.name })
                .from(comment)
                .leftJoin(user, eq(user.id, comment.userId)).where(eq(comment.id, p.id));

            if (res.length === 0) {
                return null;
            }

            return res[0];

        })
    },
};

export default resolver;
