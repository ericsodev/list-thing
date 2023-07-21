import { PrismaClient } from "@prisma/client";
import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { env } from "../env";

export type Context = {
  prisma: PrismaClient;
  req: NextApiRequest;
  res: NextApiResponse;
};

export const createContext = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.headers.authorization) {
    jwt.verify(req.headers.authorization, env.JWT_SEC);
  }
  return { prisma, req, res };
};
