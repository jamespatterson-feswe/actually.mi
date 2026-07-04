import { NextFunction, Response } from 'express';
import { validator } from './auth.middleware';
import { ValidationRequest } from './auth.interface';
import { env } from '../../lib/env';
import jwt from 'jsonwebtoken';

describe('Authorization validation', () => {
  const expiredToken = jwt.sign({ userId: 'test-id' }, env.jwtSecret, {
    expiresIn: '-10s',
  });
  const invalidToken = 'invalid-token!';
  const validToken = jwt.sign({ userId: 'test-id' }, env.jwtSecret, {
    expiresIn: '10s',
  });
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    next = jest.fn() as unknown as NextFunction;
  });

  describe('Error scenarios', () => {
    it('should expect to return a 401 when no cookie is present', () => {
      validator(
        { cookies: {}, userId: '' } as unknown as ValidationRequest,
        res,
        next
      );
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        statusDesc: 'Error: no authorization token found.',
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should expect to return a 401 when token is invalid', () => {
      validator(
        {
          cookies: { token: invalidToken },
          userId: '',
        } as unknown as ValidationRequest,
        res,
        next
      );
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        statusDesc: 'Error: Invalid token.',
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should expect a 401 when token is expired', () => {
      validator(
        {
          cookies: { token: expiredToken },
          userId: '',
        } as unknown as ValidationRequest,
        res,
        next
      );
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        statusDesc: 'Error: The token used has expired.',
      });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('Success scenarios', () => {
    it('should expect next to be called', () => {
      validator(
        {
          cookies: { token: validToken },
          userId: 'test-id',
        } as unknown as ValidationRequest,
        res,
        next
      );
      expect(next).toHaveBeenCalled();
    });
  });
});
