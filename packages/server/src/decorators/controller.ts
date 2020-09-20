import { MetadataKey } from './types';

export const Controller = (routerPath = ''): ClassDecorator => {
  return target => {
    Reflect.defineMetadata(MetadataKey.RoutePath, routerPath, target);

    if (!Reflect.hasMetadata(MetadataKey.Routes, target)) {
      Reflect.defineMetadata(MetadataKey.Routes, [], target);
    }
  };
};
