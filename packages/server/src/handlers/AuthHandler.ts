import { Inject } from 'typedi';
import { User } from '../entities';
import { IncorrectEmailOrPasswordError } from '../errors';
import { BcryptPasswordService, JwtAuthService } from '../services';

type AuthTokens = {
  accessTokenData: {
    token: string;
    expiresIn: number;
  };
  refreshTokenData: {
    token: string;
    expiresIn: number;
  };
};

export class AuthHandler {
  @Inject()
  private readonly passwordService: BcryptPasswordService;

  @Inject()
  private readonly authService: JwtAuthService;

  public async loginAuth(email: string, password: string): Promise<AuthTokens> {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new IncorrectEmailOrPasswordError();
    const verifiedPassword = await this.passwordService.compare(password, user.password);
    if (!verifiedPassword) throw new IncorrectEmailOrPasswordError();
    const accessTokenData = this.authService.generateAccessToken({ userId: user.id });
    const refreshTokenData = this.authService.generateRefreshToken({ userId: user.id });
    return { accessTokenData, refreshTokenData };
  }
}
