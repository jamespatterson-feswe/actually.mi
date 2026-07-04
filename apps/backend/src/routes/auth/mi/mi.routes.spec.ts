jest.mock('../../../lib/prisma', () => ({
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  prisma: require('../../../__mocks__/prisma').prismaMock,
}));

jest.mock('../../../lib/redis', () => ({
  redis: {
    get: jest.fn().mockResolvedValue(null),
    set: jest.fn().mockResolvedValue('OK'),
    del: jest.fn().mockResolvedValue(1),
  },
}));

import { env } from '../../../lib/env';
import { PATHS } from '../auth.constants';
import { prismaMock } from '../../../__mocks__/prisma';

import app from '../../../app';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import request from 'supertest';

afterAll((done) => {
  done();
});

describe('Auth Mi', () => {
  const validToken = jwt.sign({ userId: 'test-id-123' }, env.jwtSecret, {
    expiresIn: '1h',
  });
  let response = null;
  const _user = {
    username: 'test',
    email: 'test@email.com',
    password: 'password',
    id: 'test-id-123',
    bio: null,
    avatar: null,
    createdAt: new Date(),
    birthDate: null,
  };
  const path = `${PATHS.auth}${PATHS.mi}`;

  describe('PUT mi', () => {
    const { id, username, email, bio, password } = _user;
    const payloadWithoutPW = {
      id,
      username,
      email,
      bio,
    };
    const payload = {
      ...payloadWithoutPW,
      password,
    };

    describe('Success Scenarios', () => {
      it('should expect a 200 from a successful update proceedure', async () => {
        const hashed = await bcrypt.hash(_user.password, 10);

        prismaMock.user.findUnique.mockResolvedValue({
          ..._user,
          password: hashed,
        });

        response = await request(app)
          .put(path)
          .set('Authorization', `Bearer ${validToken}`)
          .send({ id });

        expect(response.status).toBe(200);
      });
    });

    describe('Failure Scenarios', () => {
      it('should expect a 500 from prisma find unique failure', async () => {
        prismaMock.user.findUnique.mockRejectedValue(new Error('Error'));

        response = await request(app)
          .put(path)
          .set('Authorization', `Bearer ${validToken}`)
          .send(payload);

        expect(response.status).toBe(500);
      });

      it('should expect a 400 from same password error response to be returned from api', async () => {
        const hashed = await bcrypt.hash(_user.password, 10);

        prismaMock.user.findUnique.mockResolvedValue({
          ..._user,
          password: hashed,
        });

        response = await request(app)
          .put(path)
          .set('Authorization', `Bearer ${validToken}`)
          .send(payload);

        expect(response.status).toBe(400);
      });

      it('should expect a 400 from validation on the email', async () => {
        prismaMock.user.findUnique.mockResolvedValue(_user);

        response = await request(app)
          .put(path)
          .set('Authorization', `Bearer ${validToken}`)
          .send({
            ...payload,
            email: 'notanemail',
          });

        expect(response.status).toBe(400);

        response = await request(app)
          .put(path)
          .set('Authorization', `Bearer ${validToken}`)
          .send({
            ...payload,
            email: 'test@',
          });

        expect(response.status).toBe(400);

        response = await request(app)
          .put(path)
          .set('Authorization', `Bearer ${validToken}`)
          .send({
            ...payload,
            email: '@test.com',
          });

        expect(response.status).toBe(400);

        response = await request(app)
          .put(path)
          .set('Authorization', `Bearer ${validToken}`)
          .send({
            ...payload,
            email: '',
          });

        expect(response.status).toBe(400);

        response = await request(app)
          .put(path)
          .set('Authorization', `Bearer ${validToken}`)
          .send({
            ...payload,
            email: 'test@test',
          });

        expect(response.status).toBe(400);
      });

      it('should expect a 404 from no user being found in db', async () => {
        prismaMock.user.findUnique.mockResolvedValue(null);

        response = await request(app)
          .put(path)
          .set('Authorization', `Bearer ${validToken}`)
          .send({ ...payload, password: 'different_password' });

        expect(response.status).toBe(404);
      });

      it('should expect a 500 from the update functionality failing', async () => {
        const hashed = await bcrypt.hash(_user.password, 10);

        prismaMock.user.findUnique.mockResolvedValue({
          ..._user,
          password: hashed,
        });

        prismaMock.user.update.mockRejectedValue(new Error('Error'));

        response = await request(app)
          .put(path)
          .set('Authorization', `Bearer ${validToken}`)
          .send({ ...payload, password: 'different_password' });

        expect(response.status).toBe(500);
      });
    });
  });

  describe('GET mi', () => {
    describe('Success Scenarios', () => {
      it('should expect a 200 from a user being found', async () => {
        prismaMock.user.findUnique.mockResolvedValue(_user);

        response = await request(app)
          .get(path)
          .set('Authorization', `Bearer ${validToken}`);

        expect(response.status).toBe(200);
      });
    });

    describe('Failure Scenarios', () => {
      it('should expect a 404 from a user not being found', async () => {
        prismaMock.user.findUnique.mockResolvedValue(null);

        response = await request(app)
          .get(path)
          .set('Authorization', `Bearer ${validToken}`);

        expect(response.status).toBe(404);
      });

      it('should expect a 500 when we force an api failure', async () => {
        prismaMock.user.findUnique.mockRejectedValue(
          new Error('Error: does not matter - testing purposes')
        );

        response = await request(app)
          .get(path)
          .set('Authorization', `Bearer ${validToken}`);

        expect(response.status).toBe(500);
      });
    });
  });
});
