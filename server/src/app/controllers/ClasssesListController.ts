import { Request, Response } from 'express';

import { db } from '../../database/connection';

class ClassesListController {
  async index(request: Request, response: Response) {
    const classes = await db('classes')
      .where('user_id', '=', request.userId)
      .first();

    if (!classes) {
      return response.status(400).json({
        error: 'This user has no class registered'
      })
    }

    return response.json(classes);
  }
}

export default ClassesListController;