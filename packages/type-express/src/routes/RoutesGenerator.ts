import { NextFunction, Request, Response } from 'express';
import path from 'path';
import { getMetadataStorage } from '../metadata';
import { HandlerParamMetadata, RequestHandlerMetadata } from '../metadata/definitions';
import { BuildRoutesOptions, ControllerHandler, ExpressContext, ExpressMiddleware } from '../types';
import { validateInput } from '../utils/validator';
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
  private buildGetRoutes(): Promise<void> {
    return new Promise<void>(resolve => {
      const filteredGetRoutes = this.filterControllersMetadataByControllers(
        getMetadataStorage().getRoutes
      );
      filteredGetRoutes.forEach(handlerMetadata => {
        this.routeBuilder('get', handlerMetadata);
      });
      resolve();
    });
  }

  /**
   * Build Post routes
   */
  private buildPostRoutes(): Promise<void> {
    return new Promise<void>(resolve => {
      const filteredPostRoutes = this.filterControllersMetadataByControllers(
        getMetadataStorage().postRoutes
      );
      filteredPostRoutes.forEach(handlerMetadata => {
        this.routeBuilder('post', handlerMetadata);
      });
      resolve();
    });
  }

  /**
   * General route builder
   */
  private routeBuilder(method: 'get' | 'post', handlerMetadata: RequestHandlerMetadata): void {
    const routePath = path.join(handlerMetadata.classMetadata?.path || '/', handlerMetadata.path);
    const middlewares = this.createMiddlewares(handlerMetadata);
    const controllerHandler = this.createControllerHandler(handlerMetadata);
    this.router[method](routePath, ...middlewares, controllerHandler);
  }

  /**
   * Provides request handler
   */
  private createControllerHandler(handlerMetadata: RequestHandlerMetadata): ControllerHandler {
    const instance: any = this.container.getInstance(handlerMetadata.class as any);
    return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      const expressContext: ExpressContext = { req, res, next };
      const params = await this.createParams(handlerMetadata, expressContext);
      try {
        for (let i = 0; i < params.length; i++) {
          await validateInput(params[i]);
        }
        const result = await instance[handlerMetadata.methodName](...params);
        res.json(result);
      } catch (err) {
        next(err);
      }
    };
  }

  /**
   * Generates all middlewares running before controller handler
   */
  private createMiddlewares(handlerMetadata: RequestHandlerMetadata): Array<ExpressMiddleware> {
    const middlewares: Array<ExpressMiddleware> = [];
    if (this.authChecker && handlerMetadata?.authorized) {
      middlewares.push(this.authChecker);
    }
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
  ): Promise<Array<any>> | Array<any> {
    if (!handlerMetadata.paramsMetadata?.length) return [];
    const params: Array<any> = [];
    for (let i = 0; i < handlerMetadata.paramsMetadata.length; i++) {
      const paramMetadata = handlerMetadata.paramsMetadata.find(it => it.parameterIndex === i);
      switch (paramMetadata!.paramKind) {
        case 'params':
          params.push(expressContext.req.params);
          break;
        case 'body':
          params.push(this.convertParamsToInstance(expressContext.req.body, paramMetadata!));
          break;
      }
    }
    return Promise.all(params);
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
