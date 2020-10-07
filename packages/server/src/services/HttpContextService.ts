import { NextFunction, Request, Response } from 'express';
import { Container, Service } from 'typedi';
import { BindThis } from '../helpers';

export type ContextKey = 'userId';
export type ContextValue = string | number;

@Service()
export class HttpContextService {
  private req: any;

  public set(key: ContextKey, value: ContextValue): void {
    this.req.context[key] = value;
  }

  public get(key: ContextKey): undefined | ContextValue {
    return this.req.context[key];
  }

  @BindThis()
  public middleware(req: Request, res: Response, next: NextFunction): void {
    this.req = req;
    this.req.context = {};
    next();
  }
}

export const httpContextMiddleware = Container.get(HttpContextService).middleware;
