import { NextFunction, Request, Response } from 'express';

export const createReqContext = (req: Request, res: Response, next: NextFunction): void => {
  req.context = {
    userId: undefined
  };
  next();
};
