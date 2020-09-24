import request from 'supertest';

import { db } from '../../src/database/connection';
import app from '../../src/app';

describe('User and Session', () => {
  afterAll(async () => {
    await db.destroy();
  });

  it('should create a new user in the database', async () => {
    const { status } = await request(app)
      .post('/users')
      .send({
        name: 'Alexandre',
        surname: 'Costa',
        email: 'alexandre@gmail.com',
        password: '12345678',
        confirmPassword: '12345678'
      });

    expect(status).toBe(204);
  });
});