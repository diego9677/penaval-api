import { PrismaClient } from "@prisma/client";

export interface UserLogged {
  id: number;
  email: string;
  roleId: number;
}

export { };

declare global {
  var prisma: PrismaClient;
  namespace Express {
    export interface Request {
      user?: UserLogged;
    }
  }
}
