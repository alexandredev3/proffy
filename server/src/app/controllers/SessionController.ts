import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { db } from '../../database/connection';
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

      const { id, name, avatar_id } = user[0];

      const avatar = await db('files')
        .where('id', '=', avatar_id)
        .first();
        
      return response.json({
        user: {
          id,
          name,
          avatar_url: avatar == null ? null : `http://${process.env.IMAGE_URL}/files/${avatar.path}`
        },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn
        })
      });
    } catch(err) {
      console.log(err)
      return response.status(400).json({ error: 'Unexpected error while login.' });
    }
  }
}

export default SessionController;