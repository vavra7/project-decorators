import { MetadataKey, MiddlewareFunction, Middlewares } from '../types';

export function UseMiddleware(...middlewareFunctions: Array<MiddlewareFunction>): MethodDecorator {
  return (target, propertyKey) => {
    if (!Reflect.hasMetadata(MetadataKey.Middlewares, target.constructor)) {
      Reflect.defineMetadata(MetadataKey.Middlewares, {}, target.constructor);
    }

    const middlewares: Middlewares = Reflect.getMetadata(
      MetadataKey.Middlewares,
      target.constructor
    );

    middlewares[propertyKey.toString()] = middlewareFunctions;

    Reflect.defineMetadata(MetadataKey.Middlewares, middlewares, target.constructor);
  };
}
