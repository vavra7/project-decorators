import { NextFunction, Request, Response } from 'express';

export interface ExpressContext {
  req: Request;
  res: Response;
  next: NextFunction;
}
