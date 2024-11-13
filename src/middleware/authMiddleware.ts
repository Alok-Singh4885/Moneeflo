import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../secretKey/secretKey';

declare global {
  namespace Express {
    interface Request {
      user?: { id: number };
    }
  }
}

export const authMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {

  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).send({
      message: 'Access denied. No token provided.'
    })

    return;
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as { userId: string };

    req.user = { id: Number(decoded.userId) };

    next();
  } catch (error) {
    res.status(401).send({
      message: 'Access denied. Invalid token.'
    })

    return; 
  }
};
