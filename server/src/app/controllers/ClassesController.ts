import { Request, Response } from 'express'

import { db } from '../../database/connection';
import { filterClasses } from '../../utils/filterClasses'

interface ClassItem {
  class_id: number;
  subject: string;
  cost: string;
  whatsapp: string;
  bio: string;
  user_id: number;
  name: string;
  avatar_id: number;
  path: string;
  id: number;
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

    try {

      if (!filters.week_day || !filters.subject || !filters.time) {
        const classes = await filterClasses({ isFindAll: true });
    
        return response.json(classes);
      }
      const classes = await filterClasses({ 
        week_day, time, subject, isFindAll: false 
      });
  
      if (!classes) {
        return response.status(400).json({ 
          error: 'Sorry, no classes were found...' 
        })
      };
  
      return response.json(classes);

    } catch(err) {
      console.log(err);

      return response.status(400).json({ 
        error: 'Unexpected error during class list.' 
      });
    }
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

      const user = await trx('users')  
        .where('id', '=', request.userId)
        .first();

      if (user.avatar_id == null) {
        return response.status(401).json({
          error: 'You cannot create a class without an avatar'
        })
      }

      
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