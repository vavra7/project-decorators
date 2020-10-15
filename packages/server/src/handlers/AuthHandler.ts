import { Inject } from 'typedi';
import { User } from '../entities';
import { IncorrectEmailOrPasswordError, NotAuthenticatedError } from '../errors';
import { AccessTokenAuthResponse } from '../model';
import { BcryptPasswordService, JwtAuthService } from '../services';
import { RedisStoreService } from '../services/RedisStoreService';

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

  @Inject()
  private readonly storeService: RedisStoreService;

  public async loginAuth(email: string, password: string): Promise<AuthTokens> {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new IncorrectEmailOrPasswordError();
    const verifiedPassword = await this.passwordService.compare(password, user.password);
    if (!verifiedPassword) throw new IncorrectEmailOrPasswordError();
    const accessTokenData = this.authService.generateAccessToken({ userId: user.id });
    const refreshTokenData = this.authService.generateRefreshToken({ userId: user.id });
    return { accessTokenData, refreshTokenData };
  }

  public async refreshTokenAuth(refreshToken: string): Promise<AccessTokenAuthResponse> {
    const bannedToken = await this.storeService.isTokenBanned(refreshToken);
    if (bannedToken) throw new NotAuthenticatedError();
    const tokenVerifyPayload = this.authService.verifyRefreshToken(refreshToken);
    if (!tokenVerifyPayload) throw new NotAuthenticatedError();
    const accessTokenData = this.authService.generateAccessToken({
      userId: tokenVerifyPayload.userId
    });
    return Object.assign(new AccessTokenAuthResponse(), {
      accessToken: accessTokenData.token,
      expiresIn: accessTokenData.expiresIn
    });
  }

  public logoutAuth(refreshToken?: string): true {
    if (refreshToken) this.storeService.addToBanTokens(refreshToken);
    return true;
  }
}
