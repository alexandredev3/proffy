import request from 'supertest';
import faker from 'faker';

import app from '../../src/app';

import createUsers from '../utils/createUsers';

const { name, surname, email, password, confirmPassword } = {
  name: faker.name.firstName().toString(),
  surname: faker.name.lastName().toString(),
  email: faker.internet.email().toString(),
  password: '12345678',
  confirmPassword: '12345678'
};

describe('Session', () => {
  beforeAll(async () => {
    await createUsers({ 
      name, 
      surname, 
      email, 
      password, 
      confirmPassword 
    });
  });

  it('should return a token when the user logs in', async () => {
    const { body } = await request(app)
      .post('/session')
      .send({
        email,
        password
      });
    
    expect(body).toHaveProperty('token');
  });

  it('should not log in with invalid password', async () => {
    const { status } = await request(app)
      .post('/session')
      .send({
        email,
        password: 'invalid_password'
      });

    expect(status).toBe(401);
  });

  it('should not log in with invalid email', async () => {
    const { status } = await request(app)
      .post('/session')
      .send({
        email: 'invalid_email@gmail.com',
        password
      });

    expect(status).toBe(400);
  });
});