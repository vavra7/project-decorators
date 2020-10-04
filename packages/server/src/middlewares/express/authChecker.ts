import { NextFunction, Request, Response } from 'express';
import { authCheckerCommon } from '../common';

export const authChecker = (req: Request, res: Response, next: NextFunction): void => {
  try {
    authCheckerCommon(req);
  } catch (err) {
    next(err);
  }
  next();
};
