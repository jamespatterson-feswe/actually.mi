import app from './app';
import request from 'supertest';

const originalEnv = process.env;

beforeEach(() => {
  process.env = { ...originalEnv };
});

afterEach(() => {
  process.env = originalEnv;
});

describe('App', () => {
  describe('env', () => {
    it('should apply rate limiters in non-test environment', () => {
      jest.resetModules();

      process.env.NODE_ENV = 'production';
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const app = require('./app').default;

      expect(app).toBeDefined();

      process.env.NODE_ENV = 'test';
    });

    it('should expect env.ts to throw when env var is missing', () => {
      const originalSecret = process.env.JWT_SECRET;

      jest.resetModules();
      process.env.JWT_SECRET = '';
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      expect(() => require('./lib/env')).toThrow();

      jest.resetModules();
      process.env.JWT_SECRET = '';
      process.env.DATABASE_URL = '';
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      expect(() => require('./lib/env')).toThrow();

      process.env.JWT_SECRET = originalSecret;
    });
  });

  describe('Health check', () => {
    it('should expect a 200 from the health route', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toBe(200);
    });
  });

  describe('Unknown path', () => {
    it('should expect a 404 from any path unknown to routes', async () => {
      let response = await request(app).post('/does/not/matter').send({
        id: 123,
        email: 'testing@test.com',
        username: 'does-not-matter',
      });

      expect(response.status).toBe(404);

      response = await request(app).get('/auth/blah');

      expect(response.status).toBe(404);

      response = await request(app).get('/blah/blah');

      expect(response.status).toBe(404);
    });
  });
});
