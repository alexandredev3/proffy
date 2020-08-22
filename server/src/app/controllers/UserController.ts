import { Request, Response } from 'express';
import { db } from '../../database/connection';
import { encryptsField } from '../../utils/handlePassword';

class UserController {
  async index(request: Request, response: Response) {
    const user = await db('users')
      .where('id', '=', request.userId)
      .first();

    const avatar = await db('files')
      .where('id', '=', user.avatar_id)
      .first();

    return response.json({
      name: user.name,
      image_url: `http://${process.env.IMAGE_URL}/files/${avatar.path}`
    })
  }

  async store(request: Request, response: Response) {
    const {
      name,
      surname,
      email,
      password
    } = request.body;

    try {
      const user = await db('users').where('email' , '=', email).returning('*');

      const password_hash = await encryptsField(password);

      if (user[0]) {
        return response.status(400).json({ message: 'User already exists!' });
      }

      const nameAndSurname = name + ' ' + surname;

      await db('users').insert({
        name: nameAndSurname,
        email,
        password_hash
      });

      return response.status(204).send();
    } catch(err) {
      return response.status(400).json({ error: 'Unexpected error while creating new user.' })
    }
  }
}

export default UserController;