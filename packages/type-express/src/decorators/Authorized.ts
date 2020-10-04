import { SymbolKeysNotSupportedError } from '../errors';
import { getMetadataStorage } from '../metadata/MetadataStorage';

export function Authorized(): MethodDecorator {
  return (target, propertyKey) => {
    if (typeof propertyKey === 'symbol') {
      throw new SymbolKeysNotSupportedError();
    }
    getMetadataStorage().collectAuthorizedMetadata({
      class: target.constructor,
      methodName: propertyKey
    });
  };
}
