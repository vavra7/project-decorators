import { RegisterUserBase } from '@project-decorators/shared';
import { IsString } from 'class-validator';

export class RegisterUserForm extends RegisterUserBase {
  @IsString()
  public confirmPassword: string;
}
