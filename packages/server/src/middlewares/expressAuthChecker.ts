import { NextFunction, Request, Response } from 'express';
import { authChecker } from '../utils';

export const expressAuthChecker = (req: Request, res: Response, next: NextFunction): void => {
  try {
    authChecker(req);
  } catch (err) {
    next(err);
  }
  next();
};
