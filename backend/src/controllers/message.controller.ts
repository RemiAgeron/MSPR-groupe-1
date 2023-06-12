import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

import ErrorUtils from '../utils/error.utils';

const prisma = new PrismaClient().messages;
const prismaUser = new PrismaClient().users;

// GET /api/message
// Get all messages
export const getMessages = async (req: Request, res: Response) => {
  try {
    const messages = await prisma.findMany();
    return res.status(200).json(messages);
  } catch (error) {
    return ErrorUtils.getError(error, res);
  }
};

// GET /api/message/:id
// Get message by id
export const getMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsedId = parseInt(id);

    if (parsedId <= 0 || isNaN(parsedId)) {
      return ErrorUtils.getBadRequestError(res);
    }

    const message = await prisma.findUnique({
      where: {
        id: parsedId,
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

// GET /api/message/user/:id
// Get message by user id
export const getMessageByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const userExists = await prismaUser.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    if (!userExists) {
      return ErrorUtils.getNotFoundError(res);
    }

    const user = await prisma.findMany({
      where: {
        OR: [{ senderId: parseInt(userId) }, { receiverId: parseInt(userId) }],
      },
    });
    if (!user) {
      console.log(user)
      return ErrorUtils.getNotFoundError(res);
    } else {
      return res.status(200).json(user);
    }
  } catch (error) {
    return ErrorUtils.getError(error, res);
  }
};

// POST /api/message
// Create message
export const createMessage = async (req: Request, res: Response) => {
  try {
    const { content, senderId, receiverId } = req.body;

    if (!content || !senderId || !receiverId) {
      return ErrorUtils.getMissingFieldsError(res);
    }

    if(senderId === receiverId) {
      return ErrorUtils.getBadRequestError(res);
    }

    const senderExists = await prismaUser.findUnique({
      where: {
        id: parseInt(senderId),
      },
    });

    const receiverExists = await prismaUser.findUnique({
      where: {
        id: parseInt(receiverId),
      },
    });

    if (!senderExists || !receiverExists) {
      return ErrorUtils.getNotFoundError(res);
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

// PATCH /api/message/:id
// Update message
export const updateMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const parsedId = parseInt(id);

    if (parsedId <= 0 || isNaN(parsedId)) {
      return ErrorUtils.getBadRequestError(res);
    }

    if (!content) {
      return ErrorUtils.getMissingFieldsError(res);
    }

    const idExists = await prisma.findUnique({
      where: {
        id: parsedId,
      },
    });
    if (!idExists) {
      return ErrorUtils.getNotFoundError(res);
    }



    const message = await prisma.update({
      where: {
        id: parsedId,
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

// DELETE /api/message/:id
// Delete message
export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const checkMessage = await prisma.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!checkMessage) {
      return ErrorUtils.getNotFoundError(res);
    }

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
