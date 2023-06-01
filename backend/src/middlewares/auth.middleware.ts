import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import ErrorUtils from '../utils/error.utils';

interface JwtPayload {
  id: number;
}

export const checkJwtToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  let decoded;

  if (token == null) return res.status(401).json({ error: 'Unauthorized' });

  try {
    decoded = jwt.verify(
      token,
      process.env.TOKEN_SECRET as string,
    ) as JwtPayload;
    
    if(!decoded) return res.status(401).json({ error: 'Unauthorized' });

    next();
  } catch (error) {
    // return res.status(403).json({ error: 'Forbidden' });
    return ErrorUtils.customError(error, res);
  }
};

// FIXME : checkAdmin middleware
export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).json({ error: 'Unauthorized' });
  req.body.user;

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err, user: any) => {
    if (user.isAdmin !== 'admin' || err) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  });
};
