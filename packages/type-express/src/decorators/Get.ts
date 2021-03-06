import { SymbolKeysNotSupportedError } from '../errors';
import { getMetadataStorage } from '../metadata/MetadataStorage';

export function Get(path = '/'): MethodDecorator {
  return (target, propertyKey) => {
    if (typeof propertyKey === 'symbol') {
      throw new SymbolKeysNotSupportedError();
    }
    getMetadataStorage().collectGetMetadata({
      methodName: propertyKey,
      class: target.constructor,
      path
    });
  };
}
