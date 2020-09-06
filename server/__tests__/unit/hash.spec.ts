import request from 'supertest';

import app from '../../src/app';
import { db } from '../../src/database/connection';
import { passwordCompare } from '../../src/utils/handlePassword';

let token: string;

describe('User', () => {
  it('should encrypt user password', async () => {
    const password = '12345678';

    await request(app)
      .post('/session')
      .send({
        email: 'alexandre@gmail.com',
        password
      });

    const password_compare = await passwordCompare(password);

    expect(password_compare).toBe(true);
  });

  it('should not log in with a password that does not match the user is hash in the database', async () => {
    const password = '1234567';

    await request(app)
      .post('/session')
      .send({
        email: 'alexandre@gmail.com',
        password
      });

    const password_compare = await passwordCompare(password);

    expect(password_compare).toBe(false);
  })
});