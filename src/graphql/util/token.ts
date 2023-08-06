import jwt from "jsonwebtoken";
import { env } from "@/env";
import type { User } from "../types/graphql";

async function generateToken(
  user: User,
  secret: string,
  expiresIn: number | string,
): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    jwt.sign(user, secret, { expiresIn }, (err, token) => {
      err ? resolve(undefined) : resolve(token as string);
    });
  });
}

async function verifyToken(token: string, secret: string): Promise<User | undefined> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) =>
      err ? resolve(undefined) : resolve(decoded as User),
    );
  });
}

export async function generateRefreshToken(user: User) {
  return await generateToken(user, env.REFRESH_KEY, env.REFRESH_EXP);
}
export async function generateAccessToken(user: User) {
  return await generateToken(user, env.ACCESS_KEY, env.ACCESS_EXP);
}

export async function verifyRefreshToken(token: string) {
  return await verifyToken(token, env.REFRESH_KEY);
}

export async function verifyAccessToken(token: string) {
  return await verifyToken(token, env.ACCESS_KEY);
}
