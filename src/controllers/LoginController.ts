import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

import prisma from "../lib/prisma";
import { matchPassword } from "../helpers/auth";

const secretKey = process.env.SECRET_KEY || '';

// select user equivalent query sql in prisma.js :)
const selectUser = {
  id: true,
  username: true,
  password: true,
  createdAt: true,
  updatedAt: true,
  person: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      phone: true
    }
  }
};

class LoginController {
  async login(req: Request, res: Response) {
    try {
      const { username, password: plainPwd } = req.body;
      const userDb = await prisma.user.findUnique({
        where: { username },
        select: selectUser,
      });
      if (!userDb) return res.status(400).json({ error: 'Credentials Incorrect' });
      const { password: hashPassword, ...userWithoutPassword } = userDb;
      const matchPwd = await matchPassword(plainPwd, hashPassword);
      if (!matchPwd) return res.status(400).json({ error: 'Credentials Incorrect' });
      const token = jwt.sign({ id: userDb.id, username: userDb.username }, secretKey, { expiresIn: '5d' });
      return res.status(200).json({ ...userWithoutPassword, token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }

  async whoiam(req: Request, res: Response) {
    try {
      const [_, token] = req.headers.authorization!.split(' ');
      const id = req.user?.id;
      const { password: booleanPassword, ...userWhitoutPassword } = selectUser;
      const userDb = await prisma.user.findUnique({
        where: { id },
        select: userWhitoutPassword
      });
      return res.status(200).json({ ...userDb, token });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export const loginController = new LoginController();