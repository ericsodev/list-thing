import { MutationAuthenticateArgs, MutationCreateAccountArgs } from "../types/graphql";
import { Context } from "../context";
import { GraphQLError } from "graphql";
import { userSchema } from "../../types/formSchemas/userSchema";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../util/token";
import { serialize } from "cookie";
import { isLoggedIn } from "./authUtil";
import CUSTOM_ERRORS from "../errorCodes";
import { user } from "@/db/schema";
import { and, eq } from "drizzle-orm";

const resolver = {
  Query: {
    token: async (_p: any, _a: any, ctx: Context) => {
      const user = await isLoggedIn(ctx.req.cookies["refresh-token"]);
      const token = await generateAccessToken({ name: user.name, id: user.id });
      if (!token) {
        throw new GraphQLError(...CUSTOM_ERRORS.NO_TOKEN);
      }
      return token;
    },
  },
  Mutation: {
    authenticate: async (_: any, { input }: MutationAuthenticateArgs, ctx: Context) => {
      const userSelect = await ctx.db
        .select()
        .from(user)
        .where(and(eq(user.name, input.name)));

      if (!userSelect.length) {
        throw new GraphQLError(...CUSTOM_ERRORS.NO_USER);
      }
      const userRes = userSelect[0];

      if (!(await bcrypt.compare(input.password, userRes.encryptedPass))) {
        throw new GraphQLError(...CUSTOM_ERRORS.WR_PASS);
      }

      const refresh = await generateRefreshToken({
        name: userRes.name,
        id: userRes.id,
      });
      const access = await generateAccessToken({
        name: userRes.name,
        id: userRes.id,
      });

      if (!(refresh && access)) {
        throw new GraphQLError(...CUSTOM_ERRORS.TOKEN_ERR);
      }
      ctx.res.setHeader(
        "Set-Cookie",
        serialize("refresh-token", refresh, { path: "/", httpOnly: true }),
      );
      return access;
    },
    createAccount: async (_: any, { input }: MutationCreateAccountArgs, ctx: Context) => {
      const parsedInput = await userSchema.safeParseAsync(input);

      if (!parsedInput.success) {
        // fails schema
        throw new GraphQLError(parsedInput.error.message);
      }
      // check no existing users with same name
      const existingUsers = await ctx.db
        .select()
        .from(user)
        .where(eq(user.name, parsedInput.data.name));

      if (existingUsers.length > 0) {
        throw new GraphQLError(...CUSTOM_ERRORS.USER_EXISTS);
      }

      // create account
      const encryptedPass = await bcrypt.hash(input.password, 12);
      const userCreate = await ctx.db
        .insert(user)
        .values({ name: input.name, encryptedPass: encryptedPass })
        .returning({ name: user.name, id: user.id });

      // generate a refresh token and add as httpOnly cookie
      const refreshToken = await generateRefreshToken(userCreate[0]);

      if (!refreshToken) {
        throw new GraphQLError(...CUSTOM_ERRORS.TOKEN_ERR);
      }
      ctx.res.setHeader(
        "Set-Cookie",
        serialize("refresh-token", refreshToken, { path: "/", httpOnly: true }),
      );
      return true;
    },
    logout: async (_: any, _args: any, ctx: Context) => {
      ctx.res.setHeader(
        "Set-Cookie",
        serialize("refresh-token", "", { path: "/", httpOnly: true }),
      );
    },
  },
};

export default resolver;
