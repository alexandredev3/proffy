import request from 'supertest';

import { db } from '../../src/database/connection';
import app from '../../src/app';

describe('User', () => {
  afterAll(async () => {
    await db.destroy();
    await db.migrate.rollback();
  });

  it('should create a new user in the database', async () => {
    const { status } = await request(app)
      .post('/users')
      .send({
        name: 'Alexandre',
        surname: 'Costa',
        email: 'alexandre@gmail.com',
        password: '12345678'
      });

    expect(status).toBe(204);
  });

  it('should return a token when the user logs in', async () => {
    const { body } = await request(app)
      .post('/session')
      .send({
        email: 'alexandre@gmail.com',
        password: '12345678'
      });
    
    expect(body).toHaveProperty('token');
  });
}) 