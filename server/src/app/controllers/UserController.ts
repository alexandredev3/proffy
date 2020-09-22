import { Request, Response } from 'express';
import { db } from '../../database/connection';
import { encryptsField } from '../../utils/handlePassword';

class UserController {
  async store(request: Request, response: Response) {
    const {
      name,
      surname,
      email,
      password,
      confirmPassword
    } = request.body;

    try {
      const user = await db('users').where('email' , '=', email).returning('*');

      const password_hash = await encryptsField(password);

      if (user[0]) {
        return response.status(400).json({ message: 'User already exists!' });
      }

      if (password !== confirmPassword) {
        return response.status(400).json({
          error: 'password does not match'
        });
      }

      const nameAndSurname = name + ' ' + surname;

      await db('users').insert({
        name: nameAndSurname,
        email,
        password_hash
      });

      return response.status(204).send();
    } catch(err) {
      console.log(err);

      return response.status(400).json({ error: 'Unexpected error while creating new user.' })
    }
  }
}

export default UserController;