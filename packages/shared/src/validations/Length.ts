import { Length as _Length, ValidationOptions } from 'class-validator';

export function Length(
  min: number,
  max?: number,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return _Length(min, max, {
    ...validationOptions,
    context: {
      ...(validationOptions && validationOptions.context ? validationOptions.context : {}),
      prop0: min,
      prop1: max || undefined
    }
  });
}
