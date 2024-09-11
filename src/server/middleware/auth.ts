import { SERVER_MODE } from '@promptfoo/constants';
import User from '@server/models/user';
import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { serverMode } from '../config';

// Assuming you have a User model

interface DecodedToken {
  userId: string;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (serverMode() === SERVER_MODE.OPEN) {
      next();
      return;
    }
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      res.status(401).json({ error: 'Authentication failed' });
      return;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    const user = await User.findById(decoded.userId);
    if (!user) {
      res.status(401).json({ error: 'Authentication failed' });
      return;
    }
    // Attach the user to the request object
    (req as any).user = user;

    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};
