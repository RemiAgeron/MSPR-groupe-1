import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const checkJwtToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err, user: any) => {
    if (user.getUser.id !== req.params.id || err) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  });
};

// export const checkAdmin = (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (token == null) return res.status(401).json({ error: 'Unauthorized' });

//   jwt.verify(token, process.env.TOKEN_SECRET as string, (err, user: any) => {
//     if (user.getUser.role !== 'admin' || err) {
//       return res.status(403).json({ error: 'Forbidden' });
//     }
//     next();
//   });
// };
