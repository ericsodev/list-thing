import { PrismaClient } from "@prisma/client";
import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { env } from "../env";
import { verifyAccessToken } from "./util/token";
import { User } from "./types/graphql";

export type Context = {
  prisma: PrismaClient;
  req: NextApiRequest;
  res: NextApiResponse;
  user?: User;
};

export const createContext = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  let user: User | undefined;
  if (req.headers.authorization) {
    user = await verifyAccessToken(req.headers.authorization);
  }
  return { prisma, req, res, user };
};
