import { NextFunction, Request, Response } from 'express';

export enum MetadataKey {
  RoutePath = 'routePath',
  Routes = 'routes',
  SecureMethods = 'secureMethods',
  Middlewares = 'middlewares'
}

export type SecureMethods = {
  [key: string]: boolean;
};

export interface RouteDefinition {
  routePath: string;
  httpMethod: 'get' | 'post' | 'delete' | 'options' | 'put';
  controllerMethodName: string;
}

export type MiddlewareFunction = (req: Request, res: Response, next: NextFunction) => void;

export type Middlewares = {
  [key: string]: Array<MiddlewareFunction>;
};
