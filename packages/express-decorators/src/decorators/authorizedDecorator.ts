import { MetadataKey, SecureMethods } from '../types';

export function Authorized(): MethodDecorator {
  return (target, propertyKey) => {
    if (!Reflect.hasMetadata(MetadataKey.SecureMethods, target.constructor)) {
      Reflect.defineMetadata(MetadataKey.SecureMethods, {}, target.constructor);
    }

    const secureMethods: SecureMethods = Reflect.getMetadata(
      MetadataKey.SecureMethods,
      target.constructor
    );

    secureMethods[propertyKey.toString()] = true;

    Reflect.defineMetadata(MetadataKey.SecureMethods, secureMethods, target.constructor);
  };
}
