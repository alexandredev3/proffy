import { db } from '../../database/connection';
import { Request, Response } from 'express';

class DasboardController {
  async index(request: Request, response: Response) {
    try {
      const classes = await db('classes')
        .where('user_id', '=', request.userId)
        .first();

      const schedule_class = await db('class_schedule')
        .where('class_id', '=', classes.id);

      return response.json({
        list: [
          { class: classes },
          { schedules: schedule_class }
        ]
      });
    } catch(err) {
      console.log(err)

      return response.status(400).json({ 
        error: 'Unexpected error while list an user credentials.' 
      });
    }
  }
}

export default DasboardController;