import { db } from '../../database/connection';
import { Request, Response } from 'express';
import convertHourToMinutes from '../../utils/convertHourToMinutes';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

class ScheduleController {
  async create(request: Request, response: Response) {
    const { schedule } = request.body;

    const trx = await db.transaction();

    try {
      const insertedClassesIds = await trx('classes')
        .where('user_id', '=', request.userId)
        .returning("*")

      const class_id = insertedClassesIds[0].id;
    
      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to)
        };
      });

      const scheduleFields = await trx('class_schedule')
        .insert(classSchedule)
        .returning("*");

      await trx.commit();

      return response.json(scheduleFields);
    } catch(err) {
      await trx.rollback();
      console.log(err)
      return response.status(400).json({ 
        error: 'Unexpected error while creating new Schedule.' 
      });
    }
  }

  async update(request: Request, response: Response) {
    const { week_day, from, to } = request.body;

    const { id } = request.params;

    if (!id) {
      return response.status(400).json({
        error: 'undefined id'
      });
    }

    const trx = await db.transaction();

    try {
      const class_schedule = await trx('class_schedule')
        .where('id', '=', id)
        .first();

      const classes = await trx('classes')
        .where('user_id', '=', request.userId)
        .first();

      if (class_schedule.class_id !== classes.id) {
        return response.status(401).json({
          error: 'Action not allowed!' 
        });
      }

      const schedule = await trx('class_schedule')
        .where('id', '=', id)
        .update({
          week_day, 
          from: convertHourToMinutes(from),
          to: convertHourToMinutes(to)
        })
        .returning("*")

      await trx.commit();

      return response.json(schedule);
    } catch(err) {
      await trx.rollback();

      console.log(err);
      return response.status(400).json({
        error: 'Unexpected error while updating an Schedule.' 
      });
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const class_schedule = await db('class_schedule')
        .where('id', '=', id)
        .first();

      const classes = await db('classes')
      .where('user_id', '=', request.userId)
      .first();

      if (!class_schedule) {
        return response.status(400).json({
          error: 'Schedule does not exists' 
        });
      }

      if (class_schedule.class_id !== classes.id) {
        return response.status(401).json({
          error: 'Action not allowed!' 
        });
      }

      await db('class_schedule')
        .where('id', '=', id)
        .delete();

      return response.status(204).send();
    } catch(err) {
      console.log(err)
      return response.status(400).json({
        error: 'Unexpected error while delete an Schedule.'
      })
    }
  }
}

export default ScheduleController;