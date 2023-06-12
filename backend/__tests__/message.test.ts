import request = require('supertest');
import jwt = require('jsonwebtoken');
import dotenv = require('dotenv');
const URL = 'http://localhost:5000';

dotenv.config();

// TODO: add tests for all message routes

describe('Message', () => {
  let userToken: string;
  let userId: number;
  let adminToken: string;
  let adminId: number;
  let messageId: number;

  beforeAll(async () => {
    const res = await request(URL)
      .post('/api/user/login')
      .send({
        email: 'jane@doe.com',
        password: 'password',
      })
      .expect(200);

    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('id');

    userToken = res.body.token;
    userId = res.body.id;

    const res2 = await request(URL)
      .post('/api/user/login')
      .send({
        email: 'john@doe.com',
        password: 'password',
      })
      .expect(200);

    expect(res2.body).toHaveProperty('token');

    adminToken = res2.body.token;
    adminId = res2.body.id;
  });

  describe('POST /api/message', () => {
    it('should create message', async () => {
      const newMessage = await request(URL)
        .post('/api/message')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          content: 'This is my first message',
          senderId: userId,
          receiverId: adminId,
        })
        .expect(201);

      messageId = newMessage.body.id;
    });
  });

  describe('GET /api/message', () => {
    it('should get all messages', async () => {
      await request(URL)
        .get('/api/message')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);
    });
  });

  describe('GET /api/message/:id', () => {
    it('should get message by id', async () => {
      await request(URL)
        .get(`/api/message/${messageId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);
    });
  });

  describe('GET /api/message/user/:id', () => {
    it('should get all messages by user id', async () => {
      await request(URL)
        .get(`/api/message/${messageId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);
    });
  });

  describe('PATCH /api/message/:id', () => {
    it('should update message by id', async () => {
      await request(URL)
        .patch(`/api/message/${messageId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          content: 'This is my first message',
          senderId: userId,
          receiverId: userId,
        })
        .expect(200);
    });
  });

  describe('DELETE /api/message/:id', () => {
    it('should delete message by id', async () => {
      await request(URL)
        .delete(`/api/message/${messageId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);
    });
  });

  // describe('GET /api/message/sent/:id', () => {
});
