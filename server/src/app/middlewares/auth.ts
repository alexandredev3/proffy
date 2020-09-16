import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { promisify } from 'util'

import authConfig from '../../config/auth';

interface DecodedTypes {
  id: number;
  iat: number;
  exp: number;
}

export default async (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ 
      error: 'Token not provided' 
    });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await 
      promisify(jwt.verify)(token, authConfig.secret) as DecodedTypes;

    request.userId = decoded.id;

    return next();
  } catch(err) {
    return response.status(400).json({ 
      error: 'Token invalid' 
    });
  }

}