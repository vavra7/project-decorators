import { ValidateIf, ValidationOptions } from 'class-validator';

/**
 * The same validation as native 'IsOptional'
 * however this also evaluate empty string as empty value.
 * It is needed for validating of forms.
 */
export function FormIsOptional(validationOptions?: ValidationOptions): PropertyDecorator {
  return ValidateIf((obj, value) => {
    return value !== null && value !== undefined && value !== '';
  }, validationOptions);
}
