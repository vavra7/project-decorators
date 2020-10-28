import { MaxLength as _MaxLength, ValidationOptions } from 'class-validator';

export function MaxLength(max: number, validationOptions?: ValidationOptions): PropertyDecorator {
  return _MaxLength(max, {
    ...validationOptions,
    context: {
      ...(validationOptions && validationOptions.context ? validationOptions.context : {}),
      prop0: max
    }
  });
}
