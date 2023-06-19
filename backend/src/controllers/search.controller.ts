import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

import ErrorUtils from '../utils/error.utils';

const prisma = new PrismaClient();

export const hello = async (req: Request, res: Response) => {
  return res.status(200).json('hello world');
};

// POST /api/search
// Get all users and botanists by fullname
export const getAllByFullname = async (req: Request, res: Response) => {
  try {
    const { input } = req.body;

    if (input.length <= 0) {
      return ErrorUtils.getBadRequestError(res);
    }

    let results: any[] = [];

    // Get user with left join with botanist
    const user = await prisma.users.findMany({
      include: {
        Botanist: true,
      },
      where: {
        firstname: {
          contains: input
        },
        lastname: {
          contains: input
        },
      },
    });

    results.push(...user.map((user: any) => {
      return {id: user.id, name: user.firstname.concat(' ', user.lastname), type: user.Botanist.length > 0 ? "botanist" : "user"}
    }));

    // Get plants
    const plant = await prisma.plants.findMany({
      where: {
        name: {
          contains: input
        },
        family: {
          contains: input
        },
      },
    });

    results.push(...plant.map((plant: any) => {
      return {id: plant.id, name: plant.name.concat(' ', plant.family), type: "plant"}
    }));

    return res.status(200).json(results);

  } catch (error) {
    return ErrorUtils.getError(error, res);
  }
};