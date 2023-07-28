import {
  MutationAuthenticateArgs,
  MutationCreateAccountArgs,
} from "../types/graphql";
import { Context } from "../context";
import { GraphQLError } from "graphql";
import { userSchema } from "../../types/formSchemas/userSchema";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../util/token";
import { serialize } from "cookie";
import { isLoggedIn } from "./authUtil";
import { CUSTOM_ERR, CUSTOM_ERR_MSGS } from "../errorCodes";

const resolver = {
  Query: {
    token: async (_p: any, _a: any, ctx: Context) => {
      const user = await isLoggedIn(ctx.req.cookies["refresh-token"]);
      const token = await generateAccessToken({ name: user.name, id: user.id });
      if (!token) {
        throw new GraphQLError(CUSTOM_ERR_MSGS.TOKEN_ERR, {
          extensions: { code: CUSTOM_ERR.TOKEN_ERR },
        });
      }
      return token;
    },
  },
  Mutation: {
    authenticate: async (
      _: any,
      args: MutationAuthenticateArgs,
      ctx: Context
    ) => {
      const user = await ctx.prisma.user.findFirst({
        where: {
          name: args.input.name,
        },
        select: {
          name: true,
          id: true,
          encryptedPass: true,
        },
      });
      if (!user) {
        throw new GraphQLError(CUSTOM_ERR_MSGS.NO_USER, {
          extensions: {
            code: CUSTOM_ERR.NO_USER,
          },
        });
      }

      if (!(await bcrypt.compare(args.input.password, user.encryptedPass))) {
        throw new GraphQLError(CUSTOM_ERR_MSGS.TOKEN_ERR, {
          extensions: { code: CUSTOM_ERR.TOKEN_ERR },
        });
      }

      const refresh = await generateRefreshToken({
        name: user.name,
        id: user.id,
      });
      const access = await generateAccessToken({
        name: user.name,
        id: user.id,
      });

      if (!(refresh && access)) {
        throw new GraphQLError(CUSTOM_ERR_MSGS.TOKEN_ERR, {
          extensions: { code: CUSTOM_ERR.TOKEN_ERR },
        });
      }
      ctx.res.setHeader(
        "Set-Cookie",
        serialize("refresh-token", refresh, { path: "/", httpOnly: true })
      );
      return access;
    },
    createAccount: async (
      _: any,
      args: MutationCreateAccountArgs,
      ctx: Context
    ) => {
      const result = await userSchema.safeParseAsync(args.input);

      if (!result.success) {
        // fails schema
        throw new GraphQLError(result.error.message);
      }
      // check no existing users with same name
      const existingUsers = await ctx.prisma.user.findFirst({
        where: {
          name: args.input.name,
        },
      });
      if (existingUsers) {
        throw new GraphQLError(CUSTOM_ERR_MSGS.USER_EXISTS, {
          extensions: { code: CUSTOM_ERR.USER_EXISTS },
        });
      }

      // create account
      const encryptedPass = await bcrypt.hash(args.input.password, 12);
      const user = await ctx.prisma.user.create({
        data: {
          name: args.input.name,
          encryptedPass,
        },
        select: {
          id: true,
          name: true,
        },
      });

      // generate a refresh token and add as httpOnly cookie
      const refreshToken = await generateRefreshToken(user);

      if (!refreshToken) {
        throw new GraphQLError(CUSTOM_ERR_MSGS.TOKEN_ERR, {
          extensions: { code: CUSTOM_ERR.TOKEN_ERR },
        });
      }
      ctx.res.setHeader(
        "Set-Cookie",
        serialize("refresh-token", refreshToken, { path: "/", httpOnly: true })
      );
      return true;
    },
  },
};

export default resolver;
