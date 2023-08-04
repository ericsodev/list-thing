import { GraphQLError } from "graphql";
import { User } from "../types/graphql";
import { verifyAccessToken, verifyRefreshToken } from "../util/token";
import { Context } from "../context";
import CUSTOM_ERRORS from "../errorCodes";

/**
 *  Check for valid refresh tokens and return user data from token as payload,
 *  Throws error if no refresh/invalid refresh token
 */
export async function isLoggedIn(token?: string): Promise<User> {
    if (!token) {
        throw new GraphQLError(...CUSTOM_ERRORS.NO_REFRESH);
    }
    const payload = await verifyRefreshToken(token);
    if (!payload) {
        throw new GraphQLError(...CUSTOM_ERRORS.UNAUTHORIZED);
    }
    return payload;
}

/**
 *  Check for valid access token
 */
export async function hasValidToken(token?: string): Promise<User> {
    if (!token) {
        throw new GraphQLError(...CUSTOM_ERRORS.UNAUTHORIZED);
    }
    const payload = await verifyAccessToken(token);
    if (!payload) {
        throw new GraphQLError(...CUSTOM_ERRORS.INVALID_TOKEN);
    }
    return payload;
}

/**
 * Wrapper for any protected routes
 */
export function authorized<InputType>(
    fn: (parent: any, args: InputType, ctx: Context, info: any) => unknown,
): (parent: any, args: InputType, ctx: Context, info: any) => Promise<ReturnType<typeof fn>> {
    return async (
        parent: any,
        args: InputType,
        ctx: Context,
        info: any,
    ): Promise<ReturnType<typeof fn>> => {
        // check if auth token is present
        if (!ctx.req.headers.authorization) {
            throw new GraphQLError(...CUSTOM_ERRORS.NO_TOKEN);
        }

        // validate access token
        const user = await verifyRefreshToken(ctx.req.headers.authorization);
        if (!user) {
            throw new GraphQLError(...CUSTOM_ERRORS.INVALID_TOKEN);
        }

        // check if user exists in db
        const userDb = await ctx.prisma.user.findUnique({
            where: {
                id: user.id,
                name: user.name,
            },
            select: {
                id: true,
                name: true,
            },
        });

        if (!userDb) {
            throw new GraphQLError(...CUSTOM_ERRORS.NO_USER);
        }

        ctx.user = user;
        return await fn(parent, args, ctx, info);
    };
}
