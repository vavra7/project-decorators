import { MetadataKey, RouteDefinition } from './../types';

const methodDecorator = (
  httpMethod: RouteDefinition['httpMethod'],
  routePath: string
): MethodDecorator => {
  return (target, propertyKey) => {
    if (!Reflect.hasMetadata(MetadataKey.Routes, target.constructor)) {
      Reflect.defineMetadata(MetadataKey.Routes, [], target.constructor);
    }

    const routes: RouteDefinition[] = Reflect.getMetadata(MetadataKey.Routes, target.constructor);

    routes.push({
      routePath,
      httpMethod,
      controllerMethodName: propertyKey.toString()
    });

    Reflect.defineMetadata(MetadataKey.Routes, routes, target.constructor);
  };
};

export function Get(routePath: string): MethodDecorator {
  return methodDecorator('get', routePath);
}

export function Post(routePath: string): MethodDecorator {
  return methodDecorator('post', routePath);
}

export function Delete(routePath: string): MethodDecorator {
  return methodDecorator('delete', routePath);
}

export function Put(routePath: string): MethodDecorator {
  return methodDecorator('put', routePath);
}

export function Options(routePath: string): MethodDecorator {
  return methodDecorator('options', routePath);
}
