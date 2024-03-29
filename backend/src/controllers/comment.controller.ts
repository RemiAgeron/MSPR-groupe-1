import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

import ErrorUtils from '../utils/error';

const prisma = new PrismaClient().comments;
const prismaPost = new PrismaClient().posts;

// GET /api/comment
// Get all comments
export const getComments = async (req: Request, res: Response) => {
  try {
    const comments = await prisma.findMany();
    return res.status(200).json(comments);
  } catch (error) {
    return ErrorUtils.getError(error, res);
  }
};

// GET /api/comment/:id
// Get comment by id
export const getComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const comment = await prisma.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!comment) {
      return ErrorUtils.getNotFoundError(res);
    } else {
      return res.status(200).json(comment);
    }
  } catch (error) {
    return ErrorUtils.getError(error, res);
  }
};

// GET /api/comment/user/:id
// Get comment by user id
export const getCommentByUser = async (req: Request, res: Response) => {
  try {
    const senderId = req.params.id;

    const user = await prisma.findMany({
      where: {
        senderId: parseInt(senderId),
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

// GET /api/comment/post/:id
// Get comment by post id
export const getCommentByPost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    const postExists = await prismaPost.findUnique({
      where: {
        id: parseInt(postId),
      },
    });

    if (!postExists) {
      return ErrorUtils.getNotFoundError(res);
    }

    const post = await prisma.findMany({
      where: {
        postId: parseInt(postId),
      },
    });
    if (!post) {
      return ErrorUtils.getNotFoundError(res);
    } else {
      return res.status(200).json(post);
    }
  } catch (error) {
    return ErrorUtils.getError(error, res);
  }
};

// POST /api/comment
// Create comment
export const createComment = async (req: Request, res: Response) => {
  try {
    const { content, senderId, postId } = req.body;

    if (!content || !senderId || !postId) {
      return ErrorUtils.getMissingFieldsError(res);
    }

    const checkPost = await prismaPost.findUnique({
      where: {
        id: parseInt(postId),
      },
    });

    if (!checkPost) {
      return ErrorUtils.getNotFoundError(res);
    }

    const comment = await prisma.create({
      data: {
        content: content,
        senderId: senderId,
        postId: postId,
      },
    });
    return res.status(201).json(comment);
  } catch (error) {
    return ErrorUtils.getError(error, res);
  }
};

// PATCH /api/comment/:id
// Update comment
export const updateComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) return ErrorUtils.getMissingFieldsError(res);

    const commentExists = await prisma.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!commentExists) {
      return ErrorUtils.getNotFoundError(res);
    }

    const comment = await prisma.update({
      where: {
        id: parseInt(id),
      },
      data: {
        content: content,
      },
    });
    return res.status(200).json(comment);
  } catch (error) {
    return ErrorUtils.getError(error, res);
  }
};

// DELETE /api/comment/:id
// Delete comment
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const commentExists = await prisma.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!commentExists) {
      return ErrorUtils.getNotFoundError(res);
    }

    const comment = await prisma.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.status(200).json({ message: 'Comment deleted successfully', comment });
  } catch (error) {
    return ErrorUtils.getError(error, res);
  }
};
