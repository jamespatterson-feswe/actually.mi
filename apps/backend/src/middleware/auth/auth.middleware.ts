import { Response, NextFunction } from 'express';
import { DecodedToken, ValidationRequest } from './auth.interface';
import { env } from '../../lib/env';

import jwt from 'jsonwebtoken';

export const validator = (
  req: ValidationRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;

  if (!token) {
    res
      .status(401)
      .json({ statusDesc: 'Error: no authorization token found.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret);

    req.userId = (decoded as DecodedToken).userId;
    next();
  } catch (error) {
    res.status(401).json({
      statusDesc:
        error instanceof jwt.TokenExpiredError
          ? 'Error: The token used has expired.'
          : 'Error: Invalid token.',
    });
  }
};
