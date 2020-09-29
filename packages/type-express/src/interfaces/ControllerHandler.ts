import { NextFunction, Request, Response, Router } from 'express';

export type ControllerHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;
