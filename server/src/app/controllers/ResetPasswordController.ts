import crypto from 'crypto';
import { Request, Response } from 'express';
import { isBefore } from 'date-fns';

import { db } from '../../database/connection';
import { encryptsField } from '../../utils/handlePassword';
import Mail from '../../lib/Queue';

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

      await Mail.add('RecoveryMail', { 
        user, token 
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
      const date = new Date();

      const reset_password = await trx('reset_password')
        .where('password_reset_token', '=', token)
        .where('already_been_used', '=', false)
        .first();

        if (!reset_password) {
          return response.status(400).json({ error: 'Token is invalid' })
        }

        if (isBefore(reset_password.password_reset_token_expires, date)) {
          return response.status(400).json({ 
            error: 'Token is expires!' 
          });
        }

      const user = await trx('users')
        .where('id', '=', reset_password.user_id)
        .first();

      if (!user) {
        return response.status(400).json({ 
          error: 'User does not exists' 
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