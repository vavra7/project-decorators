import { SymbolKeysNotSupportedError } from '../errors/SymbolKeysNotSupportedError';
import { getMetadataStorage } from '../metadata';

export function Params(): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (typeof propertyKey === 'symbol') {
      throw new SymbolKeysNotSupportedError();
    }
    const type = Reflect.getMetadata('design:paramtypes', target, propertyKey)[parameterIndex];
    getMetadataStorage().collectParamsMetadata({
      paramKind: 'params',
      class: target.constructor,
      methodName: propertyKey,
      parameterIndex,
      type
    });
  };
}
