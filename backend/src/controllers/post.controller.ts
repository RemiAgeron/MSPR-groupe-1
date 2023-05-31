import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

import ErrorUtils from '../utils/error.utils';

const prisma = new PrismaClient().users;

// TODO : add post controller