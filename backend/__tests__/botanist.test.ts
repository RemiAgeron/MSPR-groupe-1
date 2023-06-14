import request = require('supertest');
import dotenv = require('dotenv');
const URL = 'http://localhost:5000';

dotenv.config();

describe('Botanist', () => {
  let userToken: string;
  let userId: number;
  let adminToken: string;
  let postId: number;
  let botanistId: number;

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

  describe('POST /api/botanist', () => {
    it('should create botanist', async () => {
      const newBotanist = await request(URL)
        .post('/api/botanist')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          userId: userId,
          adress: 'abcde',
          company_name: 'Test Corp',
        })
        .expect(201);

      botanistId = newBotanist.body.id;
    });

    it('should return 404 if userId is wrong', async () => {
      await request(URL)
        .post('/api/botanist')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          userId: 9999,
          adress: 'abcde',
          company_name: 'Test Corp',
        })
        .expect(404);
    });

    it('should return 400 if its missing fields', async () => {
      await request(URL)
        .post('/api/botanist')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          userId: userId,
          adress: 'abcde',
        })
        .expect(400);
    });
  });

  describe('GET /api/botanist', () => {
    it('should return all botanists', async () => {
      await request(URL)
        .get('/api/botanist')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);
    });
  });

  describe('GET /api/botanist/:id', () => {
    it('should return one botanist', async () => {
      await request(URL)
        .get(`/api/botanist/${botanistId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);
    });

    it('should return 404 if botanistId is wrong', async () => {
      await request(URL)
        .get('/api/botanist/9999')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(404);
    });
  });

  describe('PATCH /api/botanist/:id', () => {
    it('should update botanist', async () => {
      await request(URL)
        .patch(`/api/botanist/${botanistId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          adress: 'qwerty',
        })
        .expect(200);
    });

    it('should return 404 if botanistId is wrong', async () => {
      await request(URL)
        .patch('/api/botanist/9999')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          adress: 'qwerty',
        })
        .expect(404);
    });

    it('should return 400 if its missing fields', async () => {
      await request(URL)
        .patch(`/api/botanist/${botanistId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          adress: '',
        })
        .expect(400);
    });
  });

  describe('DELETE /api/botanist/:id', () => {
    it('should delete botanist', async () => {
      await request(URL)
        .delete(`/api/botanist/${botanistId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);
    });

    it('should return 404 if botanistId is wrong', async () => {
      await request(URL)
        .delete('/api/botanist/9999')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(404);
    });
  });
});
