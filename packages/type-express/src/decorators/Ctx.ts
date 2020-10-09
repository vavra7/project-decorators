import { SymbolKeysNotSupportedError } from '../errors/SymbolKeysNotSupportedError';
import { getMetadataStorage } from '../metadata';

export function Ctx(): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (typeof propertyKey === 'symbol') {
      throw new SymbolKeysNotSupportedError();
    }
    const type = Reflect.getMetadata('design:paramtypes', target, propertyKey)[parameterIndex];
    getMetadataStorage().collectParamsMetadata({
      paramKind: 'ctx',
      class: target.constructor,
      methodName: propertyKey,
      parameterIndex,
      type
    });
  };
}
