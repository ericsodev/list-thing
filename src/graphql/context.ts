import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { verifyAccessToken } from "./util/token";
import { User } from "./types/graphql";

export type Context = {
  db: typeof db;
  req: NextApiRequest;
  res: NextApiResponse;
  user?: User;
};

export const createContext = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<Context> => {
  let user: User | undefined;
  if (req.headers.authorization) {
    user = await verifyAccessToken(req.headers.authorization);
  }
  return { db, req, res, user };
};
