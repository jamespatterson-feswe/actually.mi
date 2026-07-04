import { Router } from 'express';
import { env } from '../../../lib/env';
import { STATIC_CONTENT } from '../auth.constants';

const router = Router();

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout the current user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User logged out successfully
 */
router.post('/', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: env.nodeEnv === 'production',
    sameSite: 'strict',
  });
  res.status(200).json({ statusDesc: STATIC_CONTENT.LOGOUT.POST.success });
});

export default router;
