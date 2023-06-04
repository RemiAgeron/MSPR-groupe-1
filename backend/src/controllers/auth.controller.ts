import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import dotenv = require('dotenv');
import bcrypt = require('bcrypt');
import jwt = require('jsonwebtoken');

import ErrorUtils from '../utils/error.utils';

const prisma = new PrismaClient().users;
dotenv.config();

const generateHash = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const generateAccessToken = (id: number, isAdmin: boolean) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return jwt.sign({ id: id, isAdmin: isAdmin }, process.env.TOKEN_SECRET!, { expiresIn: '24h' });
};

// POST /api/user/login
// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return ErrorUtils.getMissingFieldsError(res);
    } else {
      const user = await prisma.findUnique({
        where: {
          email: email,
        },
      });
      if (!user) {
        return ErrorUtils.getNotFoundError(res);
      } else {
        const hashedPassword = await bcrypt.compare(password, user.password);

        if (!hashedPassword) {
          return ErrorUtils.createError(res, 401, 'Wrong password');
        } else {
          const token = generateAccessToken(user.id, user.isAdmin);
          return res.status(200).json({ id: user.id, token: token });
        }
      }
    }
  } catch (error) {
    return ErrorUtils.getError(error, res);
  }
};

// POST /api/user/register
// Register user
export const register = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email, password, phone } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return ErrorUtils.getMissingFieldsError(res);
    } else {
      const user = await prisma.findUnique({
        where: {
          email: email,
        },
      });
      if (user) {
        return ErrorUtils.createError(res, 409, 'User already exists');
      } else {
        const hashedPassword = await generateHash(password);
        const newUser = await prisma.create({
          data: {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hashedPassword,
            phone: phone ? phone : undefined,
          },
        });
        if (!newUser) {
          return ErrorUtils.createError(res, 400, 'Error when creating user');
        } else {
          const token = generateAccessToken(newUser.id, newUser.isAdmin);

          return res.status(201).json({ id: newUser.id, token: token });
        }
      }
    }
  } catch (error) {
    return ErrorUtils.getError(error, res);
  }
};
