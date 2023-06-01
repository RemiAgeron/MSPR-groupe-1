// import { PrismaClient } from '@prisma/client';
// import { Request, Response } from 'express';

// import ErrorUtils from '../utils/error.utils';

// const prisma = new PrismaClient().users;

// //GET /api/messaging
// //Get all messages
// export const getMessages = async (req: Request, res: Response) => {
//     try {
//         const messages = await prisma.findMany();
//         return res.status(200).json(messages);
//     } catch (error) {
//         return ErrorUtils.customError(error, res);
//     }
// }

// //GET /api/messaging/:id
// //Get message by id
// export const getMessage = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;

//         const message = await prisma.findUnique({
//             where: {
//                 id: parseInt(id),
//             },
//         });
//         if (!message) {
//             return ErrorUtils.getNotFoundError(res);
//         } else {
//             return res.status(200).json(message);
//         }
//     } catch (error) {
//         return ErrorUtils.customError(error, res);
//     }
// }

// //GET /api/messaging/user/:id
// //Get message by user id
// export const getMessageByUser = async (req: Request, res: Response) => {
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

// //POST /api/messaging
// //Create message
// export const createMessage = async (req: Request, res: Response) => {
//     try {
//         const { body } = req;

//         const message = await prisma.create({
//             data: body,
//         });
//         return res.status(201).json(message);
//     } catch (error) {
//         return ErrorUtils.customError(error, res);
//     }
// }

// //PATCH /api/messaging/:id
// //Update message
// export const updateMessage = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const { body } = req;

//         const message = await prisma.update({
//             where: {
//                 id: parseInt(id),
//             },
//             data: body,
//         });
//         return res.status(200).json(message);
//     } catch (error) {
//         return ErrorUtils.customError(error, res);
//     }
// }

// //DELETE /api/messaging/:id
// //Delete message
// export const deleteMessage = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;

//         await prisma.delete({
//             where: {
//                 id: parseInt(id),
//             },
//         });
//         return res.status(204).send();
//     } catch (error) {
//         return ErrorUtils.customError(error, res);
//     }
// }
