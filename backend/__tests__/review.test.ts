import request = require('supertest');
import dotenv = require('dotenv');
const URL = 'http://localhost:5000';

dotenv.config();

describe('Review', () => {
  let userToken: string;
  let userId: number;
  let adminToken: string;
  let reviewId: number;

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
  });

  describe('POST /api/review', () => {

    it('should create review', async () => {
      const newReview = await request(URL)
        .post('/api/review')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          content: 'This is my first review',
          senderId: userId,
          botanistId: 1,
        })
        .expect(201);

      reviewId = newReview.body.id;
    });

    it('should return 400 if senderId is not provided', async () => {
      await request(URL)
        .post('/api/review')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          content: 'This is my first review',
          botanistId: 1,
        })
        .expect(400);
    });

    it('should return 400 if botanistId is not provided', async () => {
      await request(URL)
        .post('/api/review')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          content: 'This is my first review',
          senderId: 1,
        })
        .expect(400);
    });

    it('should return 401 if no token is provided', async () => {
      await request(URL)
        .post('/api/review')
        .send({
          content: 'This is my first review',
          senderId: userId,
          botanistId: 1,
        })
        .expect(401);
    });
  });

  describe('GET /api/review', () => {
    it('should return all reviews', async () => {
      await request(URL)
        .get('/api/review')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
    });
  });

  describe('GET /api/review/:id', () => {
    it('should return review with id', async () => {
      await request(URL)
        .get(`/api/review/${reviewId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
    });

    it('should return 404 if review with id does not exist', async () => {
      await request(URL)
        .get('/api/review/999999')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);
    });
  });

  describe('PATCH /api/review/:id', () => {
    it('should update review with id', async () => {
      await request(URL)
        .patch(`/api/review/${reviewId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          content: 'This is my updated review',
        })
        .expect(200);
    });

    it('should return 400 if content is not provided', async () => {
      await request(URL)
        .patch(`/api/review/${reviewId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({})
        .expect(400);
    });

    it('should return 404 if review with id does not exist', async () => {
      await request(URL)
        .patch('/api/review/999999')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          content: 'This is my updated review',
        })
        .expect(404);
    });
  });

  describe('DELETE /api/review/:id', () => {
    it('should delete review with id', async () => {
      await request(URL)
        .delete(`/api/review/${reviewId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
    });

    it('should return 404 if review with id does not exist', async () => {
      await request(URL)
        .delete('/api/review/999999')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);
    });
  });
});