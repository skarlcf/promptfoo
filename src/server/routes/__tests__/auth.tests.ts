import { SERVER_MODE } from '@promptfoo/constants';
import { app } from '@promptfoo/server/server';
import request from 'supertest';

describe('Auth Endpoints', () => {
  describe('GET /api/auth/check', () => {
    it('should return 200', async () => {
      const res = await request(app).get('/api/auth/check').send({});
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('user');
      expect(res.body).toHaveProperty('serverMode');
      expect(res.body.serverMode).toBe(SERVER_MODE.OPEN);
      expect(res.body.user).toBeNull();
    });

    describe('SAAS MODE', () => {
      it('should return 401', async () => {
        process.env.SERVER_MODE = 'SAAS';
        const res = await request(app).get('/api/auth/check').send({});
        expect(res.statusCode).toBe(401);
        delete process.env.SERVER_MODE;
      });
    });
  });
});
