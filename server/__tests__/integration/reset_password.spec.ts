import request from 'supertest';

import app from '../../src/app';

describe('Reset Password', () => {
  it('should send an email to reset password', async () => {
    const { status, body } = await request(app)
      .post('/forgot_password')
      .send({
        email: 'alexandre@gmail.com'
      });

    console.log(body);

    expect(status).toBe(204);
  });

  it('should not send an email with an email that has no user registered on the platform', async () => {
    const { status } = await request(app)
      .post('/forgot_password')
      .send({
        email: 'alexandr@gmail.com'
      });

    expect(status).toBe(400);
  });
});