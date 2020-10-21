import NextRouter from 'next/router';

export interface Router {
  originalRouter: typeof NextRouter;
  push(to: string, params?: { [key: string]: string }): void;
}
