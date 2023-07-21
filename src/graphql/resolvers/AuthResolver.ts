import {
  MutationAuthenticateArgs,
  MutationCreateAccountArgs,
} from "../types/graphql";
import { Context } from "../context";
import { GraphQLError } from "graphql";
import { userSchema } from "../formSchemas/userSchema";
import bcrypt from "bcrypt";
import { generateRefreshToken } from "../util/token";
import { serialize } from "cookie";

const resolver = {
  Query: {
    getAccessToken: async (_p: any) => {},
  },
  Mutation: {
    authenticate: async (_: any, args: MutationAuthenticateArgs) => {
      return `${args.input.name}, ${args.input.password} + 1`;
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
        throw new GraphQLError("This username has been taken");
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
      if (!refreshToken) throw new GraphQLError("Error generating JWT");
      ctx.res.setHeader(
        "Set-Cookie",
        serialize("refresh-token", refreshToken, { path: "/", httpOnly: true })
      );
      return true;
    },
  },
};

export default resolver;
