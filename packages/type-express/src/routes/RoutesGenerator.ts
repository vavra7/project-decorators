import { NextFunction, Request, Response } from 'express';
import path from 'path';
import { BuildRoutesOptions, ControllerHandler, ExpressContext, ExpressMiddleware } from '../types';
import { getMetadataStorage } from '../metadata';
import { HandlerParamMetadata, RequestHandlerMetadata } from '../metadata/definitions';
import { Context } from './Context';

export class RoutesGenerator extends Context {
  constructor(options: BuildRoutesOptions) {
    super(options);
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
    filteredGetRoutes.forEach(handlerMetadata => {
      const routePath = path.join(handlerMetadata.classMetadata?.path || '/', handlerMetadata.path);
      const controllerHandler = this.createControllerHandler(handlerMetadata);
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
    filteredPostRoutes.forEach(handlerMetadata => {
      const routePath = path.join(handlerMetadata.classMetadata?.path || '/', handlerMetadata.path);
      const middlewares = this.createHandlers(handlerMetadata);
      const controllerHandler = this.createControllerHandler(handlerMetadata);
      this.router['post'](routePath, ...middlewares, controllerHandler);
    });
  }

  /**
   * Provides request handler
   */
  private createControllerHandler(handlerMetadata: RequestHandlerMetadata): ControllerHandler {
    const instance: any = this.container.getInstance(handlerMetadata.class as any);
    const handler = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      const expressContext: ExpressContext = { req, res, next };
      const params = this.createParams(handlerMetadata, expressContext);
      try {
        const result = await instance[handlerMetadata.methodName](...params);
        res.json(result);
      } catch (err) {
        next(err);
      }
    };
    return handler;
  }

  /**
   * Generates all middlewares running before controller handler
   */
  private createHandlers(handlerMetadata: RequestHandlerMetadata): Array<ExpressMiddleware> {
    const middlewares: Array<ExpressMiddleware> = [];
    if (
      this.bodyParser &&
      handlerMetadata?.paramsMetadata?.some(meta => meta.paramKind === 'body')
    ) {
      middlewares.push(this.bodyParser);
    }
    return middlewares;
  }

  /**
   * Generates parameters passed into request handler
   */
  private createParams(
    handlerMetadata: RequestHandlerMetadata,
    expressContext: ExpressContext
  ): Array<any> {
    if (!handlerMetadata.paramsMetadata?.length) return [];
    const params: Array<any> = [];
    for (let i = 0; i < handlerMetadata.paramsMetadata.length; i++) {
      const paramMetadata = handlerMetadata.paramsMetadata.find(it => it.parameterIndex === i);
      switch (paramMetadata!.paramKind) {
        case 'params':
          params.push(this.convertParamsToInstance(expressContext.req.params, paramMetadata!));
          break;
        case 'body':
          params.push(this.convertParamsToInstance(expressContext.req.body, paramMetadata!));
      }
    }
    return params;
  }

  /**
   * Converts params to metadata reflected class type
   */
  private convertParamsToInstance(data: any, paramMetadata: HandlerParamMetadata): any {
    if (!data) return data;
    const simpleTypes: Function[] = [String, Boolean, Number, Date, Array, Promise];
    if (simpleTypes.includes(data.constructor)) return data;
    return Object.assign(new paramMetadata.type(), data);
  }

  /**
   * Filters out metadata for which was not provided controller
   */
  private filterControllersMetadataByControllers(
    resolversMeta: Array<RequestHandlerMetadata>
  ): Array<RequestHandlerMetadata> {
    return resolversMeta.filter(meta => this.controllers.includes(meta.class));
  }
}
