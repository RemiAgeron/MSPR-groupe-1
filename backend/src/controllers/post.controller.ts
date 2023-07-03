import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

import ErrorUtils from '../utils/error';

const prismaPosts = new PrismaClient().posts;
const prismaUser = new PrismaClient().users;

// GET /api/post
// Get all posts
export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prismaPosts.findMany();
    return res.status(200).json(posts);
  } catch (error) {
    return ErrorUtils.getError(error, res);
  }
};

// GET /api/post/:id
// Get post by id
export const getPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsedId = parseInt(id);

    if (parsedId <= 0 || isNaN(parsedId)) {
      return ErrorUtils.getBadRequestError(res);
    }

    const post = await prismaPosts.findUnique({
      where: {
        id: parsedId,
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

// GET /api/post/user/:id
// Get post by user id
export const getPostsByUser = async (req: Request, res: Response) => {
  try {
    const senderId = req.params.id;

    const posts = await prismaPosts.findMany({
      where: {
        senderId: parseInt(senderId),
      },
    });
    if (posts.length === 0) {
      return ErrorUtils.getNotFoundError(res);
    } else {
      return res.status(200).json(posts);
    }
  } catch (error) {
    return ErrorUtils.getError(error, res);
  }
};

// POST /api/post
// Create post
export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, senderId, tags, picture } = req.body;

    if (!title || !content || !senderId) {
      return ErrorUtils.getMissingFieldsError(res);
    }

    const user = await prismaUser.findUnique({ where: { id: senderId } });

    if (!user) {
      return ErrorUtils.createError(res, 400, 'User not found');
    }

    let data = {
      title: title,
      content: content,
      sender: {
        connect: {
          id: parseInt(senderId),
        },
      },
    };

    if (tags !== null && tags !== undefined) {
      data = { ...data, tags: tags } as {
        title: string;
        content: string;
        [key: string]: unknown;
        sender: {
          connect: {
            id: number;
          };
        };
      };
    }

    if(picture !== null && picture !== undefined) {
      data = { ...data, picture: picture } as {
        title: string;
        content: string;
        [key: string]: unknown;
        sender: {
          connect: {
            id: number;
          };
        };
        tags?: string;
      }
    }

    const post = await prismaPosts.create({
      data,
    });

    return res.status(201).json(post);
  } catch (error) {
    return ErrorUtils.getError(error, res);
  }
};

// PATCH /api/post/:id
// Update post
export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, tags } = req.body;

    const checkPost = await prismaPosts.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!checkPost) {
      return ErrorUtils.getNotFoundError(res);
    }

    if (!title && !content && !tags) {
      return ErrorUtils.getMissingFieldsError(res);
    }

    let data = {};

    if (title) {
      data = { ...data, title: title };
    }
    if (content) {
      data = { ...data, content: content };
    }
    if (tags) {
      data = { ...data, tags: tags };
    }

    if (Object.keys(data).length !== 0) {
      const post = await prismaPosts.update({
        where: {
          id: parseInt(id),
        },
        data,
      });
      return res.status(200).json(post);
    } else {
      return ErrorUtils.getMissingFieldsError(res);
    }
  } catch (error) {
    return ErrorUtils.getError(error, res);
  }
};

// DELETE /api/post/:id
// Delete post
export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const checkPost = await prismaPosts.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!checkPost) {
      return ErrorUtils.getNotFoundError(res);
    } else {
      const post = await prismaPosts.delete({
        where: {
          id: parseInt(id),
        },
      });

      return res.status(200).json(post);
    }
  } catch (error) {
    return ErrorUtils.getError(error, res);
  }
};
