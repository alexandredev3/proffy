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

describe('Reset Password', () => {
  beforeAll(async () => {
    await createUsers({ 
      name, 
      surname, 
      email, 
      password, 
      confirmPassword 
    });
  });

  it('should send an email to reset password', async () => {
    const { status, body } = await request(app)
      .post('/forgot_password')
      .send({
        email
      });

    expect(status).toBe(204);
  });

  it('should not send an email with an email that has no user registered on the platform', async () => {
    const { status } = await request(app)
      .post('/forgot_password')
      .send({
        email: 'jhon@gmail.com'
      });

    expect(status).toBe(400);
  });
});