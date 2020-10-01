import { NextFunction, Request, Response } from 'express';

export type ExpressMiddleware = (
  req: Request<any, any, any, any>,
  res: Response<any>,
  next: NextFunction
) => any;
