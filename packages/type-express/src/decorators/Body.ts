import { SymbolKeysNotSupportedError } from '../errors';
import { getMetadataStorage } from '../metadata';

export function Body(): ParameterDecorator {
  return (target, propertyKey, parameterIndex) => {
    if (typeof propertyKey === 'symbol') {
      throw new SymbolKeysNotSupportedError();
    }
    const type = Reflect.getMetadata('design:paramtypes', target, propertyKey)[parameterIndex];
    getMetadataStorage().collectParamsMetadata({
      paramKind: 'body',
      class: target.constructor,
      methodName: propertyKey,
      parameterIndex,
      type
    });
  };
}
