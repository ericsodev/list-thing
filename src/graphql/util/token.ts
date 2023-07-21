import jwt from "jsonwebtoken";
import { env } from "@/env";

type User = {
  id: string;
  name: string;
};
async function generateToken(
  user: User,
  secret: string
): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    jwt.sign(user, secret, (err, token) =>
      err ? resolve(undefined) : resolve(token as string)
    );
  });
}

async function verifyToken(
  token: string,
  secret: string
): Promise<User | undefined> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) =>
      err ? resolve(undefined) : resolve(decoded as User)
    );
  });
}

export async function generateRefreshToken(user: User) {
  return await generateToken(user, env.REFRESH_KEY);
}
export async function generateAccessToken(user: User) {
  return await generateToken(user, env.ACCESS_KEY);
}

export async function verifyRefreshToken(token: string) {
  return await verifyToken(token, env.REFRESH_KEY);
}

export async function verifyAccessToken(token: string) {
  return await verifyToken(token, env.ACCESS_KEY);
}
