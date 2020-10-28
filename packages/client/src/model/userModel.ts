import { RegisterUserBase } from '@project-decorators/shared';
import { MatchPassword } from '../validations';

export class RegisterUserForm extends RegisterUserBase {
  public readonly translationPath = 'commons.models.user';

  @MatchPassword<RegisterUserForm>('password')
  public confirmPassword: string;
}
