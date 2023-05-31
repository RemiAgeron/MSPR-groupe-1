import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

import ErrorUtils from '../utils/error.utils';

const prisma = new PrismaClient().users;

// TODO : add comment controller

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


//GET /api/comment/:id
//Get comment by id
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
}

//GET /api/comment/user/:id
//Get comment by user id
export const getCommentByUser = async (req: Request, res: Response) => {
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

//GET /api/comment/post/:id
//Get comment by post id
export const getCommentByPost = async (req: Request, res: Response) => {
    try {
        const { postId } = req.params;

        const post = await prisma.findUnique({
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
}

//POST /api/comment
//Create comment
export const createComment = async (req: Request, res: Response) => {
    try {
        const { content, userId, plantId } = req.body;

        const comment = await prisma.create({
            data: {
                content,
                userId,
                plantId,
            },
        });
        return res.status(200).json(comment);
    } catch (error) {
        return ErrorUtils.getError(error, res);
    }
}

//PUT /api/comment/:id
//Update comment
export const updateComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { content, userId, plantId } = req.body;

        const comment = await prisma.update({
            where: {
                id: parseInt(id),
            },
            data: {
                content,
                userId,
                plantId,
            },
        });
        return res.status(200).json(comment);
    } catch (error) {
        return ErrorUtils.getError(error, res);
    }
}

//DELETE /api/comment/:id
//Delete comment
export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await prisma.delete({
            where: {
                id: parseInt(id),
            },
        });
        return res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        return ErrorUtils.getError(error, res);
    }
}