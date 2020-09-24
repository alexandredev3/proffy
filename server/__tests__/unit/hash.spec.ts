import request from 'supertest';
import faker from 'faker';

import createUsers from '../utils/createUsers';

import app from '../../src/app';
import { passwordCompare } from '../../src/utils/handlePassword';

const { name, surname, email, password, confirmPassword } = {
  name: faker.name.firstName().toString(),
  surname: faker.name.lastName().toString(),
  email: faker.internet.email().toString(),
  password: '12345678',
  confirmPassword: '12345678'
};

describe('User', () => {
  beforeAll(async () => {
    await createUsers({ 
      name,
      surname,
      email,
      password,
      confirmPassword
    });
  });

  it('should encrypt user password', async () => {
    await request(app)
      .post('/session')
      .send({
        email,
        password
      });

    const password_compare = await passwordCompare(password, email);

    expect(password_compare).toBe(true);
  });

  it('should not log in with a password that does not match the user is hash in the database', async () => {
    const password = '1234567';

    await request(app)
      .post('/session')
      .send({
        email,
        password
      });

    const password_compare = await passwordCompare(password, email);

    expect(password_compare).toBe(false);
  })
});