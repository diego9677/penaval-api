import { PrismaClient } from '@prisma/client';
import { UserLogged } from "../interfaces";

export { };

declare global {
  var prisma: PrismaClient;
  namespace Express {
    interface Request {
      user?: UserLogged;
    }
  }
}
