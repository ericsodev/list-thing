import { GraphQLError } from "graphql";
import { User } from "../types/graphql";
import { verifyRefreshToken } from "../util/token";

export async function isLoggedIn(token?: string): Promise<User> {
  if (!token) {
    throw new GraphQLError("No refresh token", {
      extensions: { code: "UNAUTHORIZED" },
    });
  }
  const payload = await verifyRefreshToken(token);
  if (!payload) {
    throw new GraphQLError("Invalid refresh token", {
      extensions: { code: "UNAUTHORIZED" },
    });
  }
  return payload;
}

export async function hasValidToken(token?: string): Promise<User> {
  if (!token) {
    throw new GraphQLError("No access token", {
      extensions: { code: "UNAUTHORIZED" },
    });
  }
  const payload = await verifyRefreshToken(token);
  if (!payload) {
    throw new GraphQLError("Invalid refresh token", {
      extensions: { code: "UNAUTHORIZED" },
    });
  }
  return payload;
}
