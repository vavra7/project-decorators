import { NextFunction, Request, Response } from 'express';

export type AuthChecker = (req: Request, res: Response, next: NextFunction) => boolean;
