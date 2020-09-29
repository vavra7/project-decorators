import { NextFunction, Request, Response, Router } from 'express';
import path from 'path';
import { BuildRoutesOptions, ControllerHandler, NonEmptyArray } from '../interfaces';
import { getMetadataStorage } from '../metadata';
import { ControllerMetadata } from '../metadata/definitions';
import { Context } from './Context';

export class RoutesGenerator {
  public readonly router: Router;
  private readonly controllers: NonEmptyArray<Function>;

  constructor(options: BuildRoutesOptions) {
    this.router = options.router;
    this.controllers = options.controllers;
  }

  /**
   * Generate all logic from metadata
   */
  public generateFromMetadata(): Promise<void[]> {
    return Promise.all([this.buildGetRoutes(), this.buildPostRoutes()]);
  }

  /**
   * Build Get routes
   */
  private buildGetRoutes(): void {
    const filteredGetRoutes = this.filterControllersMetadataByControllers(
      getMetadataStorage().getRoutes
    );
    filteredGetRoutes.forEach(meta => {
      const routePath = path.join(meta.controllerClassMetadata?.path || '/', meta.path);
      const controllerHandler = this.createControllerHandler(meta);
      this.router['get'](routePath, controllerHandler);
    });
  }

  /**
   * Build Post routes
   */
  private buildPostRoutes(): void {
    const filteredPostRoutes = this.filterControllersMetadataByControllers(
      getMetadataStorage().postRoutes
    );
    filteredPostRoutes.forEach(controllerMetadata => {
      const routePath = path.join(
        controllerMetadata.controllerClassMetadata?.path || '/',
        controllerMetadata.path
      );
      const controllerHandler = this.createControllerHandler(controllerMetadata);
      this.router['post'](routePath, controllerHandler);
    });
  }

  /**
   * Provides request handler
   */
  private createControllerHandler(meta: ControllerMetadata): ControllerHandler {
    const instance: any = Context.container.getInstance(meta.class);
    return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      try {
        const result = await instance[meta.methodName](req, res);
        res.json(result);
      } catch (err) {
        next(err);
      }
    };
  }

  /**
   * Filters out metadata for which was not provided controller
   */
  private filterControllersMetadataByControllers(
    resolversMeta: Array<ControllerMetadata>
  ): Array<ControllerMetadata> {
    return resolversMeta.filter(meta => this.controllers.includes(meta.class));
  }
}
