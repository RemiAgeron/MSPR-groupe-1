import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

import ErrorUtils from '../utils/error.utils';

const prisma = new PrismaClient().botanists;
const prismaUser = new PrismaClient().users;

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

// GET /api/botanist/user/:id
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

// POST /api/botanist
// Create botanist
export const createBotanist = async (req: Request, res: Response) => {
  try {
    const { userId, adress, company_name } = req.body;

    if (!userId || !adress || !company_name) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const checkUser = await prismaUser.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    if (!checkUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const botanist = await prisma.create({
      data: {
        userId: parseInt(userId),
        adress: adress,
        company_name: company_name,
      },
    });

    if (!botanist) {
      return res.status(400).json({ error: 'Error when creating botanist' });
    } else {
      return res.status(201).json(botanist);
    }
  } catch (error) {
    return ErrorUtils.getError(error, res);
  }
};

// PATCH /api/botanist/:id
// Update botanist by id
export const updateBotanist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { adress, company_name } = req.body;

    const checkBotanist = await prisma.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!checkBotanist) {
      return res.status(404).json({ error: 'Botanist not found' });
    } else {
      let data = {};
      if (adress) {
        data = { ...data, adress: adress };
      }
      if (company_name) {
        data = { ...data, company_name: company_name };
      }

      if (Object.keys(data).length > 0) {
        const botanist = await prisma.update({
          where: {
            id: parseInt(id),
          },
          data: data,
        });
        return res.status(200).json(botanist);
      } else {
        return res.status(400).json({ error: 'Missing fields' });
      }
    }
  } catch (error) {
    return ErrorUtils.getError(error, res);
  }
};

// DELETE /api/botanist/:id
// Delete botanist by id
export const deleteBotanist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const checkBotanist = await prisma.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!checkBotanist) {
      return res.status(404).json({ error: 'Botanist not found' });
    } else {
      const botanist = await prisma.delete({
        where: {
          id: parseInt(id),
        },
      });
      return res
        .status(200)
        .json({ message: 'Botanist deleted successfully', botanist });
    }
  } catch (error) {
    return ErrorUtils.getError(error, res);
  }
};
