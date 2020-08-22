import { db } from '../../database/connection';
import { Request, Response } from 'express';

class FileController {
  async index(request: Request, response: Response) {
    const { id } = request.params;

    if (!id) {
      return response.status(400).json({ 
        error: 'Please inform the id' 
      });
    }

    try {
      const image = await db('files')
        .where('id', '=', id)
        .select('files.path')
        .first();

      if (!image) {
        return response.status(400).json({ error: 'This file does not exists' });
      }

      return response.json({
        image_url: `http://${process.env.IMAGE_URL}/files/${image.path}`
      })
    } catch(err) {
      return response.status(400).json({
        error: 'Unexpected error during list an file.'
      });
    }
  }

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
        .where('id', '=', request.userId)
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