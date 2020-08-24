import { Request, Response } from 'express';

import { db } from '../../database/connection';

class TeachersCountController {
  async index(request: Request, response: Response) {

    try {
      const classes = await db('classes')
      .count()
      .first();

      if (classes) {
        return response.json({ count: classes.count });
      }

      return response.json({ count: '0' });
    } catch(err) {
      return response.status(400).json({ 
        error: 'Sorry but it was not possible to count how many teachers there are on the platform' 
      });
    }
  }
}

export default TeachersCountController;