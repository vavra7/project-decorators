import { NextFunction, Request, Response } from 'express';

export function expressErrorsHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void {
  res.status(500).json({
    errors: [
      {
        message: err.message,
        extensions: {
          stacktrace: err.stack?.split('\n')
        }
      }
    ]
  });
  // res.status(500).json(err);
}
