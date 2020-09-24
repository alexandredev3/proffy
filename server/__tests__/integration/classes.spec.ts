import request from 'supertest';
import faker from 'faker';

import app from '../../src/app';

import createUsers from '../utils/createUsers';

// user crendecials
const { name, surname, email, password, confirmPassword } = {
  name: faker.name.firstName().toString(),
  surname: faker.name.lastName().toString(),
  email: faker.internet.email().toString(),
  password: '12345678',
  confirmPassword: '12345678'
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

describe('Classes, Schedules', () => {
  beforeAll(async () => {
    const userToken = await createUsers({ 
      name, 
      surname, 
      email, 
      password, 
      confirmPassword 
    });

    token = userToken;
  });

  it('should CREATE a NEW class', async () => {
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

    expect(status).toBe(200)
  });

  it('should NOT CREATE a second class', async () => {
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

  it('should UPDATE a class', async () => {
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

  it('should CREATE schedules', async () => {
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

  it('should UPDATE a schedule with id', async () => {
    const { status } = await request(app)
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

  it('should DELETE a schedule with the id', async () => {
    const { status } = await request(app)
      .delete(`/classes/schedule/${schedule_id}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(204);
  });
})