import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import db from '../../database/connection';
import { passwordCompare } from '../../utils/handlePassword';
import authConfig from '../../config/auth';

class SessionController {
  async store(request: Request, response: Response) {
    const { email, password } = request.body;

    try {
      const user = await db('users').where('email', '=', email).returning('*')

      if (!user[0]) {
        return response.status(400).json({ error: 'User does not exists!' });
      }

      const check_password = await passwordCompare(password);

      if (!check_password) {
        return response.status(401).json({ error: 'Password does not match!' })
      }

      const { id, name, avatar } = user[0];

      return response.json({
        user: {
          id,
          name,
          avatar
        },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn
        })
      });
    } catch(err) {
      console.log(err)

      return response.status(400).json({ error: 'Unexpected error while creating new user.' });
    }
  }
}

export default SessionController;