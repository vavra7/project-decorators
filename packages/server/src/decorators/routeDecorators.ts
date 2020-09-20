import { MetadataKey, RouteDefinition } from './types';

export const Get = (routePath: string): MethodDecorator => {
  return (target, propertyKey) => {
    if (!Reflect.hasMetadata(MetadataKey.Routes, target.constructor)) {
      Reflect.defineMetadata(MetadataKey.Routes, [], target.constructor);
    }

    const routes: RouteDefinition[] = Reflect.getMetadata(MetadataKey.Routes, target.constructor);

    routes.push({
      routePath,
      httpMethod: 'get',
      controllerMethodName: propertyKey.toString()
    });

    Reflect.defineMetadata(MetadataKey.Routes, routes, target.constructor);
  };
};
