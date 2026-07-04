import { Router } from 'express';
import { env } from '../../../lib/env';
import { fields, STATIC_CONTENT } from '../auth.constants';
import { prisma } from '../../../lib/prisma';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login for a registered user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User login was successful
 *       400:
 *         description: Missing fields, email or password
 *       401:
 *         description: Incorrect password
 *       404:
 *         description: No login credentials
 *       500:
 *         description: Server error
 */
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const missing: string[] = [];
    if (!email) missing.push('email');
    if (!password) missing.push('password');

    res.status(400).json({
      statusDesc: STATIC_CONTENT.LOGIN.POST.missing_fields.replace(
        fields,
        missing.join(', ')
      ),
    });

    return;
  } else {
    try {
      const loginDetails = await prisma.user.findUnique({
        where: { email },
      });

      if (loginDetails) {
        const { password: loginPassword, id, email, username } = loginDetails;
        const comparison = await bcrypt.compare(password, loginPassword);

        if (!comparison) {
          res
            .status(401)
            .json({ statusDesc: STATIC_CONTENT.LOGIN.POST.incorrect_pw });

          return;
        }

        res.status(200).json({
          statusDesc: STATIC_CONTENT.LOGIN.POST.success,
          user: {
            id,
            email,
            username,
          },
          token: jwt.sign({ userId: id }, env.jwtSecret, {
            expiresIn: '7d',
          }),
        });

        return;
      } else {
        res.status(404).json({
          statusDesc: STATIC_CONTENT.LOGIN.POST.no_credentials,
        });

        return;
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ statusDesc: STATIC_CONTENT.LOGIN.POST.failure });

      return;
    }
  }
});

export default router;
