import { Request, Response } from 'express'

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string
};

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
      .join('users', 'classes.user_id', '=', 'user_id')
      .select(['classes.*', 'users.*']);
      

    return response.json(classes);
  }

  async create(request: Request, response: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = request.body;
  
    const trx = await db.transaction();
  
    try {
      const insertedUsersIds = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio,
      }).returning("*");
      // Vai retorna os ids dos usuarios criados.
    
      const user_id = insertedUsersIds[0].id;
      // estou pegando a posição 0 porque e la que esta o id desse usuario.,
    
      const insertedClassesIds = await trx('classes').insert({
        subject,
        cost,
        user_id
      }).returning("*");
    
      const class_id = insertedClassesIds[0].id;
    
      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to)
        };
      });
    
      await trx('class_schedule').insert(classSchedule).returning("*");
    
      await trx.commit();
    
      return response.status(201).send();
    } catch(err) {
      await trx.rollback();
      // se ocorrer alguma alteração no banco e cair nesse catch ele vai desfazer todas as operações.
  
      return response.status(400).json({ 
        error: 'Unexpected error while creating new class.' 
      });
    };
  
  }
}

export default ClassesController;