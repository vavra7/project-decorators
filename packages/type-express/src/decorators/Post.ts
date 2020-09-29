import { SymbolKeysNotSupportedError } from '../errors';
import { getMetadataStorage } from '../metadata';

export function Post(path = '/'): MethodDecorator {
  return (target, propertyKey) => {
    if (typeof propertyKey === 'symbol') {
      throw new SymbolKeysNotSupportedError();
    }
    getMetadataStorage().collectPostMetadata({
      methodName: propertyKey,
      class: target.constructor,
      path
    });
  };
}
