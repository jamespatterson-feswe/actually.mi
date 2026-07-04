import { Router } from 'express';
import { ValidationRequest, validator } from '../../../middleware/index';
import { STATIC_CONTENT } from '../auth.constants';
import { prisma } from '../../../lib/prisma';

import bcrypt from 'bcrypt';
import emailValidator from 'validator';
import { redis } from '../../../lib/redis';
import sanitize from '../../../lib/santizer';

const router = Router();

/**
 * @swagger
 * /auth/mi:
 *   put:
 *     summary: Update user data for logged in user - all fields in request body are optional
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 nullable: true
 *                 description: (optional) Update username
 *               email:
 *                 type: string
 *                 nullable: true
 *                 description: (optional) Update email
 *               bio:
 *                 type: string
 *                 nullable: true
 *                 description: (optional) Update bio
 *               password:
 *                 type: string
 *                 nullable: true
 *                 description: (optional) Update password
 *     responses:
 *       200:
 *         description: User was successfully updated
 *       400:
 *         description: Same password used or malicious email used
 *       404:
 *         description: No user credentials found
 *       500:
 *         description: Server error
 */
router.put('/', validator, async (req, res) => {
  const {
    userId,
    body: { username, email, bio, password },
  } = req as ValidationRequest;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user) {
      const passwordCheck = password
        ? await bcrypt.compare(password, user.password)
        : false;

      if (passwordCheck) {
        res.status(400).json({
          statusDesc: STATIC_CONTENT.MI.PUT.same_pw,
        });

        return;
      } else {
        if (email !== undefined && !emailValidator.isEmail(email)) {
          res.status(400).json({
            statusDesc: STATIC_CONTENT.MI.PUT.malicious_email,
          });

          return;
        }

        const updatedUserData: {
          username: string;
          email: string;
          bio: string;
          password?: string;
        } = {
          username: sanitize(username) || user.username,
          email: email || user.email,
          bio: sanitize(bio) || user.bio!,
        };

        if (password)
          updatedUserData.password = await bcrypt.hash(password, 10);

        try {
          await prisma.user.update({
            where: { id: userId },
            data: updatedUserData,
          });

          /** delete existing redis cache */
          await redis.del(`user:${userId}`);

          res.status(200).json({
            statusDesc: STATIC_CONTENT.MI.PUT.success,
          });

          return;
        } catch (error) {
          console.error(error);
          res.status(500).json({
            statusDesc: STATIC_CONTENT.MI.PUT.update_failure,
          });

          return;
        }
      }
    } else {
      res.status(404).json({
        statusDesc: STATIC_CONTENT.MI.PUT.not_found,
      });

      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusDesc: STATIC_CONTENT.MI.PUT.failure,
    });

    return;
  }
});

/**
 * @swagger
 * /auth/mi:
 *   get:
 *     summary: Get the current logged in user data
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Data was found for the user
 *       404:
 *         description: No user credentials found
 *       500:
 *         description: Server error
 */
router.get('/', validator, async (req, res) => {
  const { userId } = req as ValidationRequest;

  /** generate the cache key for redis and check is cache exists for the user in upstash */
  const cacheKey = `user:${userId}`;
  const cached = await redis.get(cacheKey);

  /** return cached user from redis if a cache exists */
  if (cached) {
    res.status(200).json({
      data: JSON.parse(cached),
      statusDesc: STATIC_CONTENT.MI.GET.success,
    });

    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars -- destructured password away from user
      const { password, ...rest } = user;

      /** set redis cache */
      await redis.set(cacheKey, JSON.stringify(rest));

      res.status(200).json({
        data: {
          ...rest,
        },
        statusDesc: STATIC_CONTENT.MI.GET.success,
      });

      return;
    } else {
      res.status(404).json({
        statusDesc: STATIC_CONTENT.MI.GET.not_found,
      });

      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusDesc: STATIC_CONTENT.MI.GET.failure,
    });

    return;
  }
});

export default router;
