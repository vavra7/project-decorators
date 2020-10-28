import { MinLength as _MinLength, ValidationOptions } from 'class-validator';

export function MinLength(min: number, validationOptions?: ValidationOptions): PropertyDecorator {
  return _MinLength(min, {
    ...validationOptions,
    context: {
      ...(validationOptions && validationOptions.context ? validationOptions.context : {}),
      prop0: min
    }
  });
}
