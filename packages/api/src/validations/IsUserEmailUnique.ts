import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { UserRepository } from '../repositories';

@ValidatorConstraint({ async: true })
class IsUserEmailUniqueConstraint implements ValidatorConstraintInterface {
  @InjectRepository()
  private readonly userRepository: UserRepository;

  public async validate(email: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      return false;
    } else {
      return true;
    }
  }

  public defaultMessage(): string {
    return 'Email "$value" already in use';
  }
}

export function IsUserEmailUnique(validationOptions?: ValidationOptions): PropertyDecorator {
  return (target, propertyKey): void => {
    if (typeof propertyKey === 'symbol') {
      throw new Error('Symbol validation is not supported');
    }
    registerDecorator({
      target: target.constructor,
      propertyName: propertyKey,
      options: validationOptions,
      constraints: [],
      validator: IsUserEmailUniqueConstraint
    });
  };
}
