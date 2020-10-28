import { RegisterUserBase } from '@project-decorators/shared';

export class RegisterUserForm extends RegisterUserBase {
  public readonly translationPath = 'commons.models.user';

  public confirmPassword: string;
}
