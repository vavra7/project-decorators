import { Express, NextFunction, Request, Response } from 'express';
import { MetadataKey, RouteDefinition, SecureMethods } from './types';

export interface BuildRestOptions {
  app: Express;
  controllers: any[];
  authChecker?(req: Request, res: Response, next: NextFunction): boolean;
}

export function buildRest(buildRestOptions: BuildRestOptions): void {
  const { controllers, app, authChecker } = buildRestOptions;

  controllers.forEach(Controller => {
    const instance = new Controller();
    const routerPath = Reflect.getMetadata(MetadataKey.RoutePath, Controller);
    const routes: RouteDefinition[] = Reflect.getMetadata(MetadataKey.Routes, Controller);
    const secureMethods: SecureMethods =
      Reflect.getMetadata(MetadataKey.SecureMethods, Controller) || {};

    routes.forEach(route => {
      const { httpMethod, routePath, controllerMethodName } = route;

      const handlers = [];

      const authorizedHandler = (req: Request, res: Response, next: NextFunction): void => {
        try {
          if (authChecker && !authChecker(req, res, next)) {
            throw new Error('Unauthorized');
          } else {
            next();
          }
        } catch (err) {
          next(err);
        }
      };

      const requestHandler = async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<any> => {
        try {
          const result = await (instance as any)[controllerMethodName](req, res);

          res.json(result);
        } catch (err) {
          next(err);
        }
      };

      if (secureMethods[controllerMethodName]) {
        handlers.push(authorizedHandler);
      }

      handlers.push(requestHandler);

      app[httpMethod](routerPath + routePath, ...handlers);
    });
  });
}
