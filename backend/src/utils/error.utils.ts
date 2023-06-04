import { Response } from 'express';

export default class ErrorUtils {
  static getError(error: unknown, res: Response) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = error;
    }
    return res.status(500).json({ error: message });
  }

  static createError(res: Response, status: number, message: string) {
    return res.status(status).json({ error: message });
  }

  static getMissingFieldsError(res: Response) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  static getNotFoundError(res: Response) {
    return res.status(404).json({ error: 'Not found' });
  }

  static getUnauthorizedError(res: Response) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  static getForbiddenError(res: Response) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  static getConflictError(res: Response) {
    return res.status(409).json({ error: 'Conflict' });
  }

  static getBadRequestError(res: Response) {
    return res.status(400).json({ error: 'Bad request' });
  }
}
