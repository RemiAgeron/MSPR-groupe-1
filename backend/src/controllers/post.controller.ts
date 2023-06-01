import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

import ErrorUtils from '../utils/error.utils';

const prismaPosts = new PrismaClient().posts;
const prismaUser = new PrismaClient().user;
//GET /api/post
//Get all posts
export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prismaPosts.findMany();
    return res.status(200).json(posts);
  } catch (error) {
    return ErrorUtils.customError(error, res);
  }
};

//GET /api/post/:id
//Get post by id
export const getPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await prismaPosts.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!post) {
      return ErrorUtils.getNotFoundError(res);
    } else {
      return res.status(200).json(post);
    }
  } catch (error) {
    return ErrorUtils.customError(error, res);
  }
};

//GET /api/post/user/:id
//Get post by user id
export const getPostsByUser = async (req: Request, res: Response) => {
  try {
    const { senderId } = req.params;

    const posts = await prismaPosts.findMany({
      where: {
        senderId: parseInt(senderId),
      },
    });
    if (!posts) {
      return ErrorUtils.getNotFoundError(res);
    } else {
      return res.status(200).json(posts);
    }
  } catch (error) {
    return ErrorUtils.customError(error, res);
  }
};

// TODO: POST /api/post
//Create post
export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, senderId } = req.body;

    if(!title || !content || !senderId) {
      return res.status(400).json({message: "Missing fields"})
    } 

    const data = {
      title: title,
      content: content,
      sender: {
        connect: {
          id: parseInt(senderId),
        },
      },
    };
    
    // if (tags) {
    //   data = { ...data, tags: tags } as {
    //     title: string;
    //     content: string;
    //     sender: {
    //       connect: {
    //         id: number;
    //     }
    //     [key: string]: any;
    //   };
    // }

    const post = await prismaPosts.create({
      data: {
        title: title,
        content: content,
        sender: {
          connect: {
            id: parseInt(senderId),
          },
        },
      }
    });
    return res.status(201).json(post);
  } catch (error) {
    return ErrorUtils.customError(error, res);
  }
};

// TODO:PATCH /api/post/:id
//Update post
export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const post = await prismaPosts.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: title,
        content: content,
      },
    });
    return res.status(200).json(post);
  } catch (error) {
    return ErrorUtils.customError(error, res);
  }
};

// TODO: DELETE /api/post/:id
//Delete post
export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await prismaPosts.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.status(200).json(post);
  } catch (error) {
    return ErrorUtils.customError(error, res);
  }
};
