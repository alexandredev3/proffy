import request from 'supertest';
import faker from 'faker';

import app from '../../src/app';

// user crendecials
const { name, surname, email, password } = {
  name: faker.name.firstName().toString(),
  surname: faker.name.lastName().toString(),
  email: faker.internet.email().toString(),
  password: '12345678'
};

// class crendecials
const { whatsapp, bio, subject, cost } = {
  whatsapp: faker.phone.phoneNumber(),
  bio: faker.lorem.words(8),
  subject: faker.lorem.words(1),
  cost: faker.commerce.price(10, 100)
}

let token: string;
let schedule_id: number;

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
    const { status } = await request(app)
      .post('/classes')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        whatsapp,
        bio,
        subject,
        cost
    });

    expect(status).toBe(201)
  });

  it('should not create a second class', async () => {
    const { status } = await request(app)
      .post('/classes')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        whatsapp,
        bio,
        subject,
        cost
    });

    expect(status).toBe(400)
  });

  it('should update a class', async () => {
    const { status } = await request(app)
      .put('/classes')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        whatsapp,
        bio,
        subject,
        cost
      });

    expect(status).toBe(200);
  });

  it('should create schedules', async () => {
    const { body, status } = await request(app)
      .post('/classes/schedule')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        schedule: [
          { week_day: 1, from: '07:00', to: '10:00' },
          { week_day: 4, from: '05:00', to: '09:00' }
        ]
      });

    schedule_id = body[0].id;

    expect(status).toBe(200);
  });

  it('should update a schedule', async () => {
    const { status, body } = await request(app)
      .put(`/classes/schedule/${schedule_id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        week_day: 6, 
        from: "5:00",
        to: "10:00" 
      })

    expect(status).toBe(200);
  });

  it('should delete the schedule with the schedule id', async () => {
    const { status } = await request(app)
      .delete(`/classes/schedule/${schedule_id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(204);
  });
});