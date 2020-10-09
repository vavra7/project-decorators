import { Inject } from 'typedi';
import { User } from '../entities';
import { IncorrectEmailOrPasswordError } from '../errors';
import { LoginAuthResponse } from '../model';
import { BcryptPasswordService, JwtAuthService } from '../services';

export class AuthHandler {
  @Inject()
  private readonly passwordService: BcryptPasswordService;

  @Inject()
  private readonly authService: JwtAuthService;

  public async loginAuth(email: string, password: string): Promise<LoginAuthResponse> {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new IncorrectEmailOrPasswordError();
    const verified = await this.passwordService.compare(password, user.password);
    if (!verified) throw new IncorrectEmailOrPasswordError();
    const { token, expiresIn } = this.authService.generateAccessToken({
      userId: user.id
    });
    return Object.assign(new LoginAuthResponse(), { accessToken: token, expiresIn });
  }
}
