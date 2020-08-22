import { Request, Response } from 'express'

import { db } from '../../database/connection';
import convertHourToMinutes from '../../utils/convertHourToMinutes';

interface ClassItem {
  id: number;
  subject: string;
  cost: string;
  whatsapp: string;
  bio: string;
  user_id: number;
}

class ClassesController {
  async show(request: Request, response: Response) {
    const filters = request.query;

    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string

    if (!filters.week_day || !filters.subject || !filters.time) {
      return response.status(400).json({
        error: 'Missing filters to search classes'
      })
    }

    const timeInMinutes = convertHourToMinutes(time);

    const classes = await db('classes')
      .whereExists(function() {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('class_schedule.class_id = classes.id')
          .whereRaw('class_schedule.week_day = ??', [Number(week_day)])
          .whereRaw('class_schedule.from <= ??', [timeInMinutes])
          .whereRaw('class_schedule.to > ??', [timeInMinutes])
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select([
        'classes.*', 
        'users.id', 'users.name', 'users.avatar_id'
      ]);

    return response.json(classes);
  }

  async create(request: Request, response: Response) {
    const {
      whatsapp,
      bio,
      subject,
      cost,
    } = request.body;
  
    const trx = await db.transaction();
  
    try {
      const alreadyExistClass = await trx('classes')
        .where('user_id', '=', request.userId)
        .first();

        
      if (alreadyExistClass) {
        return response.status(400).json({
          error: 'You already created a class, you can edit your class in the edit profile'
        })
      }

      await trx('classes')
        .insert({
          whatsapp,
          bio,
          subject,
          cost,
          user_id: request.userId
        })
        .returning("*");
    
      await trx.commit();
    
      return response.status(201).send();
    } catch(err) {
      await trx.rollback();
      console.log(err)
      // se ocorrer alguma alteração no banco e cair nesse catch ele vai desfazer todas as operações.
      return response.status(400).json({ 
        error: 'Unexpected error while creating new class.' 
      });
    };
  }

  async update(request: Request, response: Response) {
    const {
      whatsapp,
      bio,
      subject,
      cost
    } = request.body;

    try {
      const classes = await db('classes')
        .where('user_id', '=', request.userId)
        .update({
          whatsapp,
          bio,
          cost,
          subject,
        })
        .returning('*');

      return response.json(classes);
    } catch(err) {
      console.log(err)

      return response.status(400).json({ 
        error: 'Unexpected error during class update.' 
      });
    };
  }

  async delete(request: Request, response: Response) {
    try {
      await db('classes')
        .where('user_id', '=', request.userId)
        .delete();

      return response.status(204).send();
    } catch(err) {
      return response.status(400).json({ 
        error: 'Unexpected error during class delete.' 
      });
    }
  }
}

export default ClassesController;