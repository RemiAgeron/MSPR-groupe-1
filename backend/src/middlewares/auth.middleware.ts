import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import ErrorUtils from '../utils/error';

interface JwtPayload {
  id: number;
  isAdmin: boolean;
}

export const checkJwtToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // const authHeader = req.headers['authorization'];
  // const token = authHeader && authHeader.split(' ')[1];

  // if (token == null) return res.status(401).json({ error: 'Unauthorized' });

  try {
    // const decoded = jwt.verify(
    //   token,
    //   process.env.TOKEN_SECRET as string,
    // ) as JwtPayload;

    // if (!decoded) return res.status(401).json({ error: 'Unauthorized' });

    next();
  } catch (error) {
    return ErrorUtils.getError(error, res);
  }
};

export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  // const authHeader = req.headers['authorization'];
  // const token = authHeader && authHeader.split(' ')[1];

  // if (token == null) return res.status(401).json({ error: 'Unauthorized' });

  // const decoded = jwt.verify(
  //   token,
  //   process.env.TOKEN_SECRET as string,
  // ) as JwtPayload;

  // if (!decoded.isAdmin) return res.status(403).json({ error: 'Forbidden' });

  next();
};
