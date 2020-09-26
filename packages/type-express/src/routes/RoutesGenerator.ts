import { NextFunction, Request, Response, Router } from 'express';
import path from 'path';
import { BuildRoutesOptions, NonEmptyArray } from '../interfaces';
import { getMetadataStorage } from '../metadata';
import { ControllerMetadata } from '../metadata/definitions';

export class RoutesGenerator {
  public router: Router;
  private controllers: NonEmptyArray<Function>;

  constructor(options: BuildRoutesOptions) {
    this.router = options.router;
    this.controllers = options.controllers;
  }

  public generateFromMetadata(): Promise<void[]> {
    getMetadataStorage().build();
    return Promise.all([this.buildGetRoutes()]);
  }

  private buildGetRoutes(): void {
    const filteredGetRoutes = this.filterControllersMetaByControllers(
      getMetadataStorage().getRoutes
    );
    filteredGetRoutes.forEach(meta => {
      const instance = new (meta.target as any)();
      const routePath = path.join(meta.controllerClassMetadata?.path || '/', meta.path);
      this.router['get'](
        routePath,
        async (req: Request, res: Response, next: NextFunction): Promise<any> => {
          try {
            const result = await instance[meta.methodName](req, res);

            res.json(result);
          } catch (err) {
            next(err);
          }
        }
      );
    });
  }

  private filterControllersMetaByControllers(
    resolversMeta: Array<ControllerMetadata>
  ): Array<ControllerMetadata> {
    return resolversMeta.filter(meta => this.controllers.includes(meta.target));
  }
}
