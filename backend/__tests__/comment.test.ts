import request = require('supertest');
import dotenv = require('dotenv');
const URL = 'http://localhost:5000';

dotenv.config();

// TODO: add tests for all comment routes

describe('Comment', () => {
  let userToken: string;
  let userId: number;
  let adminToken: string;
  let postId: number;
  let commentId: number;

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

    const post = await request(URL)
      .post('/api/post')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        title: 'My first post',
        content: 'This is my first post',
        senderId: userId,
      })
      .expect(201);

    postId = post.body.id;
  });

  describe('POST /api/comment', () => {

    it('should create comment', async () => {
      const newComment = await request(URL)
        .post('/api/comment')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          content: 'This is my first comment',
          senderId: userId,
          postId: postId,
        })
        .expect(201);

      commentId = newComment.body.id;
    });

    it('should return 404 if postId is incorrect', async () => {
      await request(URL)
        .post('/api/comment')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          content: 'This is my first comment',
          senderId: userId,
          postId: 99999,
        })
        .expect(404);
    });

    it('should return 400 if its missing fields', async () => {
      await request(URL)
        .post('/api/comment')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          content: 'This is my first comment',
          senderId: userId,
        })
        .expect(400);
    });
  });

  describe('GET /api/comment', () => {
    it('should return all comments', async () => {
      await request(URL)
        .get('/api/comment')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);
    });
  });

  describe('GET /api/comment/:id', () => {
    it('should return comment by id', async () => {
      await request(URL)
        .get(`/api/comment/${commentId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);
    });

    it('should return 404 if comment id is incorrect', async () => {
      await request(URL)
        .get('/api/comment/99999')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(404);
    });
  });

  describe('GET /api/comment/post/:id', () => {
    it('should return all comments by post id', async () => {
      await request(URL)
        .get(`/api/comment/post/${postId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);
    });

    it('should return 404 if post id is incorrect', async () => {
      await request(URL)
        .get('/api/comment/post/99999')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(404);
    });
  });

  describe('PATCH /api/comment/:id', () => {
    it('should update comment', async () => {
      await request(URL)
        .patch(`/api/comment/${commentId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          content: 'This is my updated comment',
        })
        .expect(200);
    });

    it('should return 404 if comment id is incorrect', async () => {
      await request(URL)
      .patch('/api/comment/99999')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        content: 'This is my updated comment',
      })
      .expect(404);
    });

    it('should return 400 if its missing fields', async () => {
      await request(URL)
        .patch(`/api/comment/${commentId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          content: '',
        })
        .expect(400);
    });
  });

  describe('DELETE /api/comment/:id', () => {
    it('should delete comment', async () => {
      await request(URL)
        .delete(`/api/comment/${commentId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);
    });

    it('should return 404 if comment id is incorrect', async () => {
      await request(URL)
        .delete('/api/comment/99999')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(404);
    });
  });
});