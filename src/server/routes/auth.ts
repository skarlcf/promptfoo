import { SERVER_MODE } from '@promptfoo/constants';
import express from 'express';
import { serverMode } from '../config';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.get('/check', authMiddleware, async (req, res) => {
  try {
    if (serverMode() === SERVER_MODE.OPEN) {
      res.json({ user: null, serverMode: serverMode() });
      return;
    }
    const user = (req as any).user;
    res.json({ user, serverMode: serverMode() });
  } catch (error) {
    console.error('Error checking authentication:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
