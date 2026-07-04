import { Router } from 'express';
import { env } from '../../../lib/env';
import { fields, STATIC_CONTENT } from '../auth.constants';
import { prisma } from '../../../lib/prisma';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sanitize from '../../../lib/santizer';
import validator from 'validator';

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registration for a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Missing or invalid fields
 *       409:
 *         description: User already exists
 *       500:
 *         description: Server error
 */
router.post('/', async (req, res) => {
  const { username, email, password } = req.body;

  if (username && email && password) {
    const hashedPW = await bcrypt.hash(password, 10);

    if (!validator.isEmail(email)) {
      res
        .status(400)
        .json({ statusDesc: STATIC_CONTENT.REGISTER.POST.malicious_email });

      return;
    }

    try {
      const user = await prisma.user.create({
        data: {
          username: sanitize(username),
          email,
          password: hashedPW,
        },
      });

      const token = jwt.sign({ userId: user.id }, env.jwtSecret, {
        expiresIn: '7d',
      });

      res.status(201).json({
        user: { id: user.id, username: user.username, email: user.email },
        token,
      });

      return;
    } catch (error) {
      if (
        (error as unknown as { code: string }).code ===
        STATIC_CONTENT.PRISMA_CODES.EXISTS
      ) {
        res
          .status(409)
          .json({ statusDesc: STATIC_CONTENT.REGISTER.POST.user_exists });
      } else {
        res
          .status(500)
          .json({ statusDesc: STATIC_CONTENT.REGISTER.POST.failure });
      }
    }
  } else {
    const missing: string[] = [];

    if (!username) missing.push('username');
    if (!email) missing.push('email');
    if (!password) missing.push('password');

    res.status(400).json({
      statusDesc: `${STATIC_CONTENT.REGISTER.POST.missing_fields}`.replace(
        fields,
        missing.join(', ')
      ),
    });

    return;
  }
});

export default router;
