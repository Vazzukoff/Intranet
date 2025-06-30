import { Router } from 'express';
import { AuthenticatedRequest } from '../interfaces/auth.interface';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

router.get('/me', requireAuth, (req: AuthenticatedRequest, res) => {
    const { user } = req;
    res.status(200).json({ user });
  });

  export default router;