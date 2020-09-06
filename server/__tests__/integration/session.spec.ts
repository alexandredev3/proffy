import request from 'supertest';
import faker from 'faker';

import app from '../../src/app';

// user crendecials
const { name, surname, email, password } = {
  name: faker.name.firstName().toString(),
  surname: faker.name.lastName().toString(),
  email: faker.internet.email().toString(),
  password: 'password'
};

// class crendecials
const { whatsapp, bio, subject, cost } = {
  whatsapp: faker.phone.phoneNumber(),
  bio: faker.lorem.paragraphs(1),
  subject: faker.lorem.words(1),
  cost: faker.commerce.price(10, 100)
}

let token: string;

describe('Session', () => {
  beforeAll(async () => {
    await request(app)
      .post('/users')
      .send({
        name,
        surname,
        email,
        password
      })
      .expect(204);
  });


  it('should return a token when the user logs in', async () => {
    const { body } = await request(app)
      .post('/session')
      .send({
        email,
        password
      });
    
    token = body.token;

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

  it('should create a new class', async () => {
    const response = await request(app)
      .post('/classes')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        whatsapp,
        bio,
        subject,
        cost
    });

    expect(response.status).toBe(201)
  })
});