import { RegisterUserBase } from '@project-decorators/shared';
import { RegisterUserInput } from '../graphql';
import { FormModel } from '../types';
import { i18n } from '../utils';
import { MatchPassword } from '../validations';

export class RegisterUserForm extends RegisterUserBase implements FormModel {
  public readonly translationPath = 'commons.models.user';

  @MatchPassword<RegisterUserForm>('password')
  public confirmPassword: string;

  public getData(): RegisterUserInput {
    return {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,
      preferredLanguage: i18n.lang
    };
  }
}
