import { Express, NextFunction, Request, Response } from 'express';
import { MetadataKey, RouteDefinition } from './types';

export interface BuildRestOptions {
  app: Express;
  controllers: any[];
}

export function buildRest(buildRestOptions: BuildRestOptions): void {
  const { controllers, app } = buildRestOptions;

  controllers.forEach(Controller => {
    const instance = new Controller();
    const routerPath = Reflect.getMetadata(MetadataKey.RoutePath, Controller);
    const routes: RouteDefinition[] = Reflect.getMetadata(MetadataKey.Routes, Controller);

    routes.forEach(route => {
      const { httpMethod, routePath, controllerMethodName } = route;

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

      app[httpMethod](routerPath + routePath, requestHandler);
    });
  });
}
