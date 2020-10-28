import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

@ValidatorConstraint({ async: false, name: 'matchPassword' })
class MatchPasswordConstraint implements ValidatorConstraintInterface {
  public validate(value: any, args: ValidationArguments): boolean {
    const matchedPropName = args.constraints[0];
    const matchedPropVal = (args.object as any)[matchedPropName];
    return value === matchedPropVal;
  }
}

export function MatchPassword<T extends object = any>(
  originalPassword: keyof T,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return (target, propertyKey): void => {
    if (typeof propertyKey === 'symbol') {
      throw new Error('Symbol validation is not supported');
    }
    registerDecorator({
      target: target.constructor,
      propertyName: propertyKey,
      options: validationOptions,
      constraints: [originalPassword],
      validator: MatchPasswordConstraint
    });
  };
}
