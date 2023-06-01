import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

import ErrorUtils from '../utils/error.utils';

const prisma = new PrismaClient().users;

// //GET /api/conversation
// //Get all conversations
// export const getConversations = async (req: Request, res: Response) => {
//     try {
//         const conversations = await prisma.findMany();
//         return res.status(200).json(conversations);
//     } catch (error) {
//         return ErrorUtils.customError(error, res);
//     }
// }

// //GET /api/conversation/:id
// //Get conversation by id
// export const getConversation = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;

//         const conversation = await prisma.findUnique({
//             where: {
//                 id: parseInt(id),
//             },
//         });
//         if (!conversation) {
//             return ErrorUtils.getNotFoundError(res);
//         } else {
//             return res.status(200).json(conversation);
//         }
//     } catch (error) {
//         return ErrorUtils.customError(error, res);
//     }
// }

// //GET /api/conversation/user/:id
// //Get conversation by user id
// export const getConversationByUser = async (req: Request, res: Response) => {
//     try {
//         const { userId } = req.params;

//         const user = await prisma.findUnique({
//             where: {
//                 userId: parseInt(userId),
//             },
//         });
//         if (!user) {
//             return ErrorUtils.getNotFoundError(res);
//         } else {
//             return res.status(200).json(user);
//         }
//     } catch (error) {
//         return ErrorUtils.customError(error, res);
//     }
// }

// //POST /api/conversation
// //Create conversation
// export const createConversation = async (req: Request, res: Response) => {
//     try {
//         const { userId } = req.body;

//         const user = await prisma.create({
//             data: {
//                 userId: parseInt(userId),
//             },
//         });
//         return res.status(201).json(user);
//     } catch (error) {
//         return ErrorUtils.customError(error, res);
//     }
// }

// //PATCH /api/conversation/:id
// //Update conversation
// export const updateConversation = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const { userId } = req.body;

//         const conversation = await prisma.update({
//             where: {
//                 id: parseInt(id),
//             },
//             data: {
//                 userId: parseInt(userId),
//             },
//         });
//         return res.status(200).json(conversation);
//     } catch (error) {
//         return ErrorUtils.customError(error, res);
//     }
// }

//DELETE /api/conversation/:id
//Delete conversation
export const deleteConversation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const conversation = await prisma.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res
      .status(200)
      .send({ message: 'Conversation deleted successfully', conversation });
  } catch (error) {
    return ErrorUtils.customError(error, res);
  }
};
