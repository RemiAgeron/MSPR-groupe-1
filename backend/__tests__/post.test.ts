import request = require('supertest');
import jwt = require('jsonwebtoken');
import dotenv = require('dotenv');
const URL = 'http://localhost:5000';

dotenv.config();

describe('Post', () => {
  let userToken: string;
  let adminToken: string;
  let userId: number;
  let postId: number;

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

  describe('POST /api/post', () => {
    it('should create post', async () => {
      await request(URL)
        .post('/api/post')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          title: 'My first post',
          content: 'This is my first post',
          senderId: userId,
        })
        .expect(201);
    });

    it('should create post with tags', async () => {
      await request(URL)
        .post('/api/post')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          title: 'My second post',
          content: 'This is my second post',
          senderId: userId,
          tags: 'tag',
        })
        .expect(201);
    });

    it('should return 400 if user does not exist', async () => {
      await request(URL)
        .post('/api/post')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          title: 'My third post',
          content: 'This is my third post',
          senderId: 999,
        })
        .expect(400);
    });
  });

  describe('GET /api/post', () => {
    it('should get all posts', async () => {
      await request(URL)
        .get('/api/post')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);
    });
  });

  describe('GET /api/post/:id', () => {
    it('should get post by id', async () => {
      const res = await request(URL)
        .get('/api/post')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      postId = res.body[0].id;

      await request(URL)
        .get(`/api/post/${postId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);
    });

    it('should return 404 if post does not exist', async () => {
      await request(URL)
        .get('/api/post/999')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(404);
    });

    it('should return 400 if id is not a number', async () => {
      await request(URL)
        .get('/api/post/abc')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(400);
    });

    it('should return 400 if id is negative', async () => {
      await request(URL)
        .get('/api/post/-1')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(400);
    });

    it('should return 400 if id is 0', async () => {
      await request(URL)
        .get('/api/post/0')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(400);
    });
  });

  describe('GET /api/post/user/:id', () => {
    it('should get posts by user id', async () => {
      await request(URL)
        .get(`/api/post/user/${userId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);
    });

    it('should return 404 if user does not exist', async () => {
      await request(URL)
        .get('/api/post/user/999')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(404);
    });
  });

  describe('PATCH /api/post/:id', () => {
    it('should update post', async () => {
      await request(URL)
        .patch(`/api/post/${postId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          title: 'My updated post',
          content: 'This is my updated post',
        })
        .expect(200);
    });

    it('should return 404 if post does not exist', async () => {
      await request(URL)
        .patch('/api/post/999')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          title: 'My updated post',
          content: 'This is my updated post',
        })
        .expect(404);
    });

    it('should return 400 if missing fields', async () => {
      await request(URL)
        .patch(`/api/post/${postId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({})
        .expect(400);
    });
  });

  describe('DELETE /api/post/:id', () => {
    it('should delete post', async () => {
      await request(URL)
        .delete(`/api/post/${postId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);
    });

    it('should return 404 if post does not exist', async () => {
      await request(URL)
        .delete('/api/post/999')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(404);
    });
  });
});
