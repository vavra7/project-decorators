import { SymbolKeysNotSupportedError } from '../errors';
import { getMetadataStorage } from '../metadata/MetadataStorage';

export function Get(path = '/'): MethodDecorator {
  return (prototype, methodName) => {
    if (typeof methodName === 'symbol') {
      throw new SymbolKeysNotSupportedError();
    }

    getMetadataStorage().collectGetHandlerMetadata({
      methodName,
      target: prototype.constructor,
      path
    });
  };
}
