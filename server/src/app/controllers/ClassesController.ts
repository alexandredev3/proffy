import { Request, Response } from 'express'

import db from '../../database/connection';
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
  async index(request: Request, response: Response) {
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
      .select(['classes.*', 'users.*']);
      

    return response.json(classes);
  }

  async create(request: Request, response: Response) {
    const {
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = request.body;
  
    const trx = await db.transaction();
  
    try {
      const insertedUserId = await trx('users')
        .where('id', '=', request.userId)
        .returning('*');

      if (!insertedUserId[0]) {
        return response.status(401).json({ error: 'you are not allowed to do this action' });
      }

      const user_id = insertedUserId[0].id;

      await trx('classes')
        .insert({
          whatsapp,
          bio,
          subject,
          cost,
          user_id
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

    const { id } = request.params;

    const trx = await db.transaction();

    try {
      const classes = await trx('classes')
        .where('id', '=', id)
        .update({
          whatsapp,
          bio,
          cost,
          subject,
        })
        .returning("*");

      if (!classes[0]) {
        return response.status(400).json({ error: 'class does not exists' });
      }

      classes.map((classItem: ClassItem) => {
        if (classItem.user_id !== request.userId) {
          return response.status(401).json({ error: 'action not allowed' })
        }
      })

      await trx.commit();

      return response.json({
        classes
      });

    } catch(err) {
      await trx.rollback();
      // se ocorrer alguma alteração no banco e cair nesse catch ele vai desfazer todas as operações.
      console.log(err)
      return response.status(400).json({ 
        error: 'Unexpected error during class update.' 
      });
    };
  }
}

export default ClassesController;