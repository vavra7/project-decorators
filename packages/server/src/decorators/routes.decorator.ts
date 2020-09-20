import { Router } from 'express';

export const router = Router();

interface IOptions {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete';
  middlewares?: any[];
}

function routesDecorator(options: IOptions): any {
  console.log('options', options);

  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    console.log('target', target);
    console.log('propertyKey', propertyKey);
    console.log('descriptor', descriptor);

    (router as any)[options.method](options.path, target[propertyKey]);
  };
}

export function Get(path: string) {
  return (target: any, propertyKey: string) => {
    router['get'](path, target[propertyKey]);
  };
}

export default routesDecorator;
