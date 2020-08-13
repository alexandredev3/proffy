import multer, { FileFilterCallback } from 'multer';
import { resolve } from 'path';
import crypto from 'crypto';
import { Request } from 'express';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'temp', 'uploads'),
    filename(request, file, callback) {
      const hash = crypto.randomBytes(6).toString('hex');

      const filename = `${hash}-${Date.now()}`;

      callback(null, filename);
    }
  }),
  limits: {
    fileSize: 4 * 1024 * 1024,
    // 4mb
  },
  fileFilter: ((request: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
    const allowedMines = [
      'image/jpeg',
      'image/jpg',
      'image/png'
    ];

    if (allowedMines.includes(file.mimetype)) {
      callback(null, true)
    } else {
      callback(new Error('Invalid file type'));
    }
  })
}