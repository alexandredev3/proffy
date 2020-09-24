import request from "supertest";
import app from "../../src/app";

interface Props {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default async function createUsers(props: Props) {
  const { name, surname, email, password, confirmPassword } = props;

  await request(app)
    .post('/users')
    .send({
      name,
      surname,
      email,
      password,
      confirmPassword
    })
    .expect(204);

  const { body } = await request(app)
    .post('/session')
    .send({
      email,
      password
    })
    .expect(200);

  const token: string = body.token

  return token;
}