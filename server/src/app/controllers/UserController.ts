import { Request, Response } from 'express';
import db from '../../database/connection';
import { encryptsPassword } from '../../utils/handlePassword';

class UserController {
  async store(request: Request, response: Response) {
    const {
      name,
      surname,
      email,
      password
    } = request.body;

    try {
      const user = await db('users').where('email' , '=', email).returning('*');

      const password_hash = await encryptsPassword(password);

      if (user[0]) {
        return response.status(400).json({ message: 'User already exists!' });
      }

      await db('users').insert({
        name,
        surname,
        email,
        password_hash
      });

      return response.status(204).send();
    } catch(err) {
      return response.status(400).json({ error: 'Unexpected error while creating new user.' })
    }
  }

  async update(request: Request, response: Response) {
    return console.log(request.userId);
  }
}

export default UserController;