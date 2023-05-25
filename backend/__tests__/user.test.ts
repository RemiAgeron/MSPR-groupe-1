import request = require('supertest');
import jwt = require('jsonwebtoken');
import dotenv = require('dotenv');
const URL = 'http://localhost:5000';

dotenv.config();

describe('User', () => {
  describe('POST /api/user/login', () => {
    it('should login user', async () => {
      const res = await request(URL)
        .post('/api/user/login')
        .send({
          email: 'john@doe.com',
          password: 'toto',
        })
        .expect(200);

      const token = res.body.token;
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET!);
      expect(decoded).toHaveProperty('id');
    });

    it('should return 400 if missing fields', async () => {
      await request(URL)
        .post('/api/user/login')
        .send({
          email: 'john@doe.com',
        })
        .expect(400);
    });

    it('should return 404 if user not found', async () => {
      await request(URL)
        .post('/api/user/login')
        .send({
          email: 'notjohn@doe.com',
          password: 'password',
        })
        .expect(404);
    });

    it('should return 401 if wrong password', async () => {
      await request(URL)
        .post('/api/user/login')
        .send({
          email: 'john@doe.com',
          password: 'wrongPassword',
        })
        .expect(401);
    });
  });
});
1