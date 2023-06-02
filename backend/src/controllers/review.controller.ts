import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

import ErrorUtils from '../utils/error.utils';

const prisma = new PrismaClient().reviews;

// GET /api/review
// Get all reviews
export const getReviews = async (req: Request, res: Response) => {
  try {
    const review = await prisma.findMany();
    return res.status(200).json(review);
  } catch (error) {
    return ErrorUtils.customError(error, res);
  }
};

// GET /api/review/:id
// Get review by id
export const getReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const review = await prisma.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!review) {
      return ErrorUtils.getNotFoundError(res);
    } else {
      return res.status(200).json(review);
    }
  } catch (error) {
    return ErrorUtils.customError(error, res);
  }
};

// GET /api/review/user/:id
// Get review by user id
export const getReviewByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const user = await prisma.findMany({
      where: {
        senderId: parseInt(userId),
      },
    });
    if (!user) {
      return ErrorUtils.getNotFoundError(res);
    } else {
      return res.status(200).json(user);
    }
  } catch (error) {
    return ErrorUtils.customError(error, res);
  }
};

// GET /api/review/botanist/:id
// Get review by botanist id
export const getReviewByBotanist = async (req: Request, res: Response) => {
  try {
    const botanistId = req.params.id;

    const botanist = await prisma.findMany({
      where: {
        botanistId: parseInt(botanistId),
      },
    });
    if (!botanist) {
      return ErrorUtils.getNotFoundError(res);
    } else {
      return res.status(200).json(botanist);
    }
  } catch (error) {
    return ErrorUtils.customError(error, res);
  }
};

// POST /api/review
// Create review
export const createReview = async (req: Request, res: Response) => {
  try {
    const { content, senderId, botanistId } = req.body;

    if (!content || !senderId || !botanistId) {
      return ErrorUtils.getMissingFieldsError(res);
    }

    const review = await prisma.create({
      data: {
        content: content,
        senderId: parseInt(senderId),
        botanistId: parseInt(botanistId),
      },
    });
    return res.status(201).json(review);
  } catch (error) {
    return ErrorUtils.customError(error, res);
  }
};

// PATCH /api/review/:id
// Update review
export const updateReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
      return ErrorUtils.getMissingFieldsError(res);
    }

    const idExists = await prisma.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!idExists) {
      return ErrorUtils.getNotFoundError(res);
    }

    const review = await prisma.update({
      where: {
        id: parseInt(id),
      },
      data: {
        content: content,
      },
    });
    return res.status(200).json(review);
  } catch (error) {
    return ErrorUtils.customError(error, res);
  }
};

// DELETE /api/review/:id
// Delete review
export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const review = await prisma.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res
      .status(200)
      .send({ message: 'Message deleted successfully', review });
  } catch (error) {
    return ErrorUtils.customError(error, res);
  }
};
