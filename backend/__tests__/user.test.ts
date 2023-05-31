import request = require('supertest');
import jwt = require('jsonwebtoken');
import dotenv = require('dotenv');
const URL = 'http://localhost:5000';

dotenv.config();

describe('User', () => {
  let userToken: string;
  let adminToken: string;
  let userId: number;

  describe('POST /api/user/register', () => {
    it('should register user', async () => {
      const res = await request(URL)
        .post('/api/user/register')
        .send({
          firstname: 'Jane',
          lastname: 'Doe',
          email: 'jane@doe.com',
          password: 'password',
          phone: '0606060606',
        })
        .expect([201, 409])

      if(res.status === 201) {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('token');
        
        userToken = res.body.token;
        userId = res.body.id;
      } else if(res.status === 409) {
        expect(res.body).toHaveProperty('error');
      }
    });

    it('should register admin user', async () => {
      const res = await request(URL)
        .post('/api/user/register')
        .send({
          firstname: 'John',
          lastname: 'Doe',
          email: 'john@doe.com',
          password: 'password',
          phone: '0606060606',
          isAdmin: 'true',
        })
        .expect([201, 409])

      if(res.status === 201) {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('token');
        
        adminToken = res.body.token;
      } else if(res.status === 409) {
        expect(res.body).toHaveProperty('error');
      }
    });


    it('should return 400 if missing fields', async () => {
      await request(URL)
        .post('/api/user/register')
        .send({
          firstname: 'Jane',
          lastname: 'Doe',
          password: 'password',
          phone: '0606060606',
        })
        .expect(400);
      });
  });

  describe('POST /api/user/login', () => {
    it('should login user', async () => {
      const res = await request(URL)
        .post('/api/user/login')
        .send({
          email: 'jane@doe.com',
          password: 'password',
        })
        .expect(200);

      userToken = res.body.token;
      userId = res.body.id;
      const decoded = jwt.verify(userToken, process.env.TOKEN_SECRET!);
      expect(decoded).toHaveProperty('id');
    });

    it('should return 400 if missing fields', async () => {
      await request(URL)
        .post('/api/user/login')
        .send({
          email: 'jane@doe.com',
        })
        .expect(400);
    });

    it('should return 404 if user not found', async () => {
      await request(URL)
        .post('/api/user/login')
        .send({
          email: 'notjane@doe.com',
          password: 'password',
        })
        .expect(404);
    });

    it('should return 401 if wrong password', async () => {
      await request(URL)
        .post('/api/user/login')
        .send({
          email: 'jane@doe.com',
          password: 'wrongPassword',
        })
        .expect(401);
    });
  });

  describe('GET /api/user', () => {
    it('should return all users', async () => {
      const res = await request(URL)
        .get('/api/user')
        .expect(200);
    });
  });

  describe('GET /api/user/:id', () => {
    it('should return user', async () => {
      const res = await request(URL)
        .get(`/api/user/${userId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(res.body).toHaveProperty('id');
    });

    it('should return 404 if user not found', async () => {
      await request(URL)
        .get('/api/user/999999')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(404);
    });
  });

  describe('PUT /api/user/:id', () => {
    it('should update user', async () => {
      const res = await request(URL)
        .patch(`/api/user/${userId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          phone: '0707070707',
        })
        .expect(200);

      expect(res.body).toHaveProperty('id');

      const updatedUser = await request(URL)
        .get(`/api/user/${userId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(updatedUser.body.phone).toBe('0707070707');
    });
  });




});
