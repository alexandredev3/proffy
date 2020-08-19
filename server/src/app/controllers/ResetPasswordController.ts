import crypto from 'crypto';
import { Request, Response } from 'express';

import { db } from '../../database/connection';
import Mail from '../../lib/Mail';
import { encryptsField } from '../../utils/handlePassword';

class ResetPasswordController {
  async create(request: Request, response: Response) {
    const { email } = request.body;

    try {
      const user = await db('users')
        .where('email', '=', email)
        .first();

      if (!user) {
        return response.status(400).json({ error: 'User does not exists' });
      }

      const token = crypto.randomBytes(20).toString('hex');

      // Tem pode expiração
      const now = new Date();
      now.setHours(now.getHours() + 1);
      // estou setando uma hora para o token expirar.

      await db('reset_password')
        .where('user_id', '=', user.id)
        .delete();

      await db('reset_password')
        .insert({
          password_reset_token: token,
          password_reset_token_expires: now,
          user_id: user.id
        });

      await Mail.sendMail({
        to: `${user.name} - <${user.email}>`,
        from: 'proffy@proffy.com.br',
        subject: 'Definir senha',
        template: 'recovery',
        context: {
          user: user.name,
          token
        },
      });

      return response.status(204).send();
    } catch(err) {
      console.log(err)

      return response.status(400).json({ 
        error: 'Unexpected error while reset password.' 
      });
    }
  }

  async update(request: Request, response: Response) {
    const { token } = request.params;

    const { 
      email, 
      password, 
      confirm_password 
    } = request.body;

    const trx = await db.transaction();
    
    try {

      const user = await trx('users')
        .where('email', '=', email)
        .first();

      if (!user) {
        return response.status(400).json({ error: 'User does not exists' });
      }

      const date = new Date();

      const reset_password = await trx('reset_password')
        .where('user_id', '=', user.id)
        .where('password_reset_token', '=', token)
        .where('already_been_used', '=', false)
        .first();

        if (!reset_password) {
          return response.status(400).json({ error: 'Token is invalid' })
        }

        if (date > reset_password.password_reset_token_expires) {
          return response.status(400).json({ 
            error: 'Token is expires!' 
          });
        }

      if (password !== confirm_password) {
        return response.status(400).json({ 
          error: 'Password and Confirm Password do not match ' 
        });
      }

      const password_hash = await encryptsField(password);

      await trx('users')
        .where('email', '=', user.email)
        .update({
          password_hash
        });

      await trx('reset_password')
        .where('password_reset_token', '=', token)
        .update({
          already_been_used: true
        })

      await trx.commit();

      return response.status(204).send();
    } catch(err) {
      await trx.rollback();

      return response.status(400).json({
        error: 'Unexpected error while reset password.' 
      });
    }
  }
}

export default ResetPasswordController;