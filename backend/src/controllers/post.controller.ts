import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

import ErrorUtils from '../utils/error.utils';

const prisma = new PrismaClient().users;

//GET /api/post
//Get all posts
export const getPosts = async (req: Request, res: Response) => {
    try {
        const posts = await prisma.findMany();
        return res.status(200).json(posts);
    } catch (error) {
        return ErrorUtils.getError(error, res);
    }
}

//GET /api/post/:id
//Get post by id
export const getPost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const post = await prisma.findUnique({
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
        return ErrorUtils.getError(error, res);
    }
}

//GET /api/post/user/:id
//Get post by user id
export const getPostsByUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const user = await prisma.findUnique({
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
}

//POST /api/post
//Create post
export const createPost = async (req: Request, res: Response) => {
    try {
        const { title, content, userId } = req.body;

        const post = await prisma.create({
            data: {
                title,
                content,
                userId: parseInt(userId),
            },
        });
        return res.status(201).json(post);
    } catch (error) {
        return ErrorUtils.getError(error, res);
    }
}

//PATCH /api/post/:id
//Update post
export const updatePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const post = await prisma.update({
            where: {
                id: parseInt(id),
            },
            data: {
                title,
                content,
            },
        });
        return res.status(200).json(post);
    } catch (error) {
        return ErrorUtils.getError(error, res);
    }
}

//DELETE /api/post/:id
//Delete post
export const deletePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const post = await prisma.delete({
            where: {
                id: parseInt(id),
            },
        });
        return res.status(200).json(post);
    } catch (error) {
        return ErrorUtils.getError(error, res);
    }
}

