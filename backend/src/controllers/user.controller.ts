import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

import ErrorUtils from '../utils/error.utils';

const prisma = new PrismaClient().users;

// GET /api/user
// Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.findMany();
    return res.status(200).json(users);
  } catch (error) {
    return ErrorUtils.getError(error, res);
  }
};

// GET /api/user/:id
// Get user by id
export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!user) {
      return ErrorUtils.getNotFoundError(res);
    } else {
      return res.status(200).json(user);
    }
  } catch (error) {
    return ErrorUtils.getError(error, res);
  }
};

// PATCH /api/user/:id
// Update user by id
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, email, phone, description } = req.body;

    if (!firstname && !lastname && !email && !phone && !description) {
      return res.status(400).json({ error: 'Missing fields' });
    } else {
      const user = await prisma.update({
        where: {
          id: parseInt(id),
        },
        data: {
          firstname: firstname,
          lastname: lastname,
          email: email,
        },
      });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      } else {
        return res.status(200).json(user);
      }
    }
  } catch (error) {
    return ErrorUtils.getError(error, res);
  }
};

// DELETE /api/user/:id
// Delete user by id
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.delete({
      where: {
        id: parseInt(id),
      },
    });
    if (!user) {
      return ErrorUtils.getNotFoundError(res);
    } else {
      return res.status(200).json(user);
    }
  } catch (error) {
    return ErrorUtils.getError(error, res);
  }
};
