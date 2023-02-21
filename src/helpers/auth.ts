import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserLogged } from '../index';

const secretKey = process.env.SECRET_KEY ?? 'super_secret_key';

export async function encryptPassword(pwd: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pwd, salt);
}

export async function matchPassword(pwd: string, hashPwd: string): Promise<boolean> {
  return await bcrypt.compare(pwd, hashPwd);
}

export async function validateToken(token: string): Promise<UserLogged> {
  if (typeof token !== 'string') throw new Error('Invalid token');

  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) return reject(error);
      return resolve(decoded as UserLogged);
    });
  });
}