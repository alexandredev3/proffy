import { Request, Response } from 'express'

import { db } from '../../database/connection';
import convertHourToMinutes from '../../utils/convertHourToMinutes';

interface Schedule {
  id: number,
  week_day: number;
  from: number;
  to: number;
  class_id: number;
}

interface ClassItem {
  id: number;
  subject: string;
  cost: string;
  whatsapp: string;
  bio: string;
  user_id: number;
  name: string;
  avatar_id: number;
  path: string;
  week_day: number;
  from: number;
  to: number;
}

interface Class {
  id: number;
  subject: string;
  cost: string;
  whatsapp: string;
  bio: string;
  user_id: number;
  name: string;
  avatar_id: number;
  path: string;
}

interface Schedules {
  week_day: number;
  from: number;
  to: number;
}

class ClassesController {
  async show(request: Request, response: Response) {
    const filters = request.query;

    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string

    if (!filters.week_day || !filters.subject || !filters.time) {
      const classes = await db('classes')
        .join('users', 'classes.user_id', '=', 'users.id')
        .join('files', 'files.id', '=', 'users.avatar_id')
        .join('class_schedule', 'class_schedule.class_id', '=', 'classes.id')
        .select([
          'classes.*',
          'users.name', 'users.avatar_id', 'files.path',
          'class_schedule.*'
        ]);
  
        const classList = classes.map((item: ClassItem) => {
          const { 
            avatar_id,
            name,
            bio,
            whatsapp,
            cost,
            id,
            subject,
            user_id,
            path,
            week_day,
            from,
            to
          } = item;
    
          return {
            class: {
              user_id,
              name,
              avatar_url: avatar_id == null ? null : `http://${process.env.IMAGE_URL}/files/${path}`,
              class_id: id,
              subject,
              whatsapp,
              bio,
              cost,
            },
    
            schedules: {
              week_day,
              from,
              to
            }
          }
      });

      return response.json(classList);
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
      .join('files', 'files.id', '=', 'users.avatar_id')
      .join('class_schedule', 'class_schedule.class_id', '=', 'classes.id')
      .select([
        'classes.*',
        'users.name', 'users.avatar_id',
        'files.path',
        'class_schedule.*'
      ]);

    if (!classes[0]) {
      return response.status(400).json({ 
        error: 'Sorry, no classes were found...' 
      })
    };

    // const classes_schedule = await db('class_schedule')
    //   .returning('*')

    const classesList = classes.map((item: ClassItem) => {
      const { 
        avatar_id,
        name,
        bio,
        whatsapp,
        cost,
        id,
        subject,
        user_id,
        path,
        week_day,
        from,
        to
      } = item;

      return {
        class: {
          user_id,
          name,
          avatar_url: avatar_id == null ? null : `http://${process.env.IMAGE_URL}/files/${path}`,
          class_id: id,
          subject,
          whatsapp,
          bio,
          cost,
        },

        schedules: {
          week_day,
          from,
          to
        }
      }
    });

    return response.json(classesList);
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

      const [ classCreated ] = await trx('classes')
        .insert({
          whatsapp,
          bio,
          subject,
          cost,
          user_id: request.userId
        })
        .returning("*");
    
      response.json(classCreated);

      return await trx.commit();
    } catch(err) {
      console.log(err)
      await trx.rollback();
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
      const [ classUpdated ] = await db('classes')
        .where('user_id', '=', request.userId)
        .update({
          whatsapp,
          bio,
          cost,
          subject,
        })
        .returning('*');

      return response.json(classUpdated);
    } catch(err) {
      console.log(err)

      return response.status(400).json({ 
        error: 'Unexpected error during class update.' 
      });
    };
  }

  async delete(request: Request, response: Response) {
    await db('classes')
      .where('user_id', '=', request.userId)
      .delete();

    return response.status(204).send();
  }
}

export default ClassesController;