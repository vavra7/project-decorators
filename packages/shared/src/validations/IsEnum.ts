import { IsEnum as _IsEnum, ValidationOptions } from 'class-validator';

export function IsEnum(entity: Object, validationOptions?: ValidationOptions): PropertyDecorator {
  return _IsEnum(entity, {
    ...validationOptions,
    context: {
      ...(validationOptions && validationOptions.context ? validationOptions.context : {}),
      prop0: Object.values(entity).join(', ')
    }
  });
}
