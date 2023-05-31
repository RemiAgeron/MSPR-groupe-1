import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

import ErrorUtils from '../utils/error.utils';

const prisma = new PrismaClient().botanists;

// TODO : add botanist controller

// GET /api/botanist
// Get all botanists
export const getBotanists = async (req: Request, res: Response) => {
  try {
    const bontanists = await prisma.findMany();
    return res.status(200).json(bontanists);
  } catch (error) {
    return ErrorUtils.getError(error, res);
  }
};

// GET /api/botanist/:id
// Get botanist by id
export const getBotanist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const botanist = await prisma.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!botanist) {
      return ErrorUtils.getNotFoundError(res);
    } else {
      return res.status(200).json(botanist);
    }
  } catch (error) {
    return ErrorUtils.getError(error, res);
  }
};

// FIXME : GET /api/botanist/user/:id
// Get botanist by user id
export const getBotanistByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await prisma.findMany({
      where: {
        userId: parseInt(userId),
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

// TODO : POST /api/botanist
// Create botanist
export const createBotanist = async (req: Request, res: Response) => {
  try {
    console.log("WIP");
  } catch (error) {
    return ErrorUtils.getError(error, res);
  }
};

// TODO :  PATCH /api/botanist/:id
// Update botanist by id


// TODO :  DELETE /api/botanist/:id
// Delete botanist by id
