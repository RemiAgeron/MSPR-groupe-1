import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

import ErrorUtils from '../utils/error.utils';

const prisma = new PrismaClient().messages;

// GET /api/messaging
// Get all messages
export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await prisma.findMany();
    return res.status(200).json(messages);
  } catch (error) {
    return ErrorUtils.getError(error, res);
  }
};

// GET /api/messaging/:id
// Get message by id
export const getMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const message = await prisma.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!message) {
      return ErrorUtils.getNotFoundError(res);
    } else {
      return res.status(200).json(message);
    }
  } catch (error) {
    return ErrorUtils.getError(error, res);
  }
};

// GET /api/messaging/user/:id
// Get message by user id
export const getMessageByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const user = await prisma.findMany({
      where: {
        OR: [{ senderId: parseInt(userId) }, { receiverId: parseInt(userId) }],
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

// POST /api/messaging
// Create message
export const createMessage = async (req: Request, res: Response) => {
  try {
    const { content, senderId, receiverId } = req.body;

    if (!content || !senderId || !receiverId) {
      return ErrorUtils.getMissingFieldsError(res);
    }

    const message = await prisma.create({
      data: {
        content: content,
        senderId: parseInt(senderId),
        receiverId: parseInt(receiverId),
      },
    });
    return res.status(201).json(message);
  } catch (error) {
    return ErrorUtils.getError(error, res);
  }
};

// PATCH /api/messaging/:id
// Update message
export const updateMessage = async (req: Request, res: Response) => {
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

    const message = await prisma.update({
      where: {
        id: parseInt(id),
      },
      data: {
        content: content,
      },
    });
    return res.status(200).json(message);
  } catch (error) {
    return ErrorUtils.getError(error, res);
  }
};

// DELETE /api/messaging/:id
// Delete message
export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const userMessage = await prisma.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res
      .status(200)
      .send({ message: 'Message deleted successfully', userMessage });
  } catch (error) {
    return ErrorUtils.getError(error, res);
  }
};
