import app from '../../../app';
import request from 'supertest';

describe('Auth Logout', () => {
  describe('POST /auth/logout', () => {
    it('should return 200 and clear the cookie on logout', async () => {
      const response = await request(app).post('/auth/logout');
      expect(response.status).toBe(200);
      expect(response.headers['set-cookie']).toBeDefined();
    });
  });
});
