import { db } from '../../database/connection';
import { Request, Response } from 'express';

class FileController {
  async create(request: Request, response: Response) {
    const { originalname: name, filename: path } = request.file;

    const trx = await db.transaction();

    try {
      const file = await trx('files').insert({
        name,
        path
      }).returning("*");
  
      const avatar_id = file[0].id;

      await trx('users')
        .update({ avatar_id });

      await trx.commit();

      return response.json(file);
    } catch(err) {
      await trx.rollback();

      console.log(err)

      return response.status(400).json({
        error: 'Unexpected error during create file.'
      });
    }
  }
}

export default FileController;