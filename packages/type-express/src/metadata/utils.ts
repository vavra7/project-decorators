import { ReflectMetadataMissingError } from '../errors';

export function ensureReflectMetadataExists(): void {
  if (
    typeof Reflect !== 'object' ||
    typeof Reflect.decorate !== 'function' ||
    typeof Reflect.metadata !== 'function'
  ) {
    throw new ReflectMetadataMissingError();
  }
}
