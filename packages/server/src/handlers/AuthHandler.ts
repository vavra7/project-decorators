import { Inject } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { IncorrectEmailOrPasswordError, NotAuthenticatedError } from '../errors';
import { AccessTokenAuthResponse } from '../models';
import { BanTokensRepository, UserRepository } from '../repositories';
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

  @Inject()
  private readonly banTokensRepository: BanTokensRepository;

  @InjectRepository()
  private readonly userRepository: UserRepository;

  public async login(email: string, password: string): Promise<AuthTokens> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new IncorrectEmailOrPasswordError();
    const verifiedPassword = await this.passwordService.compare(password, user.password);
    if (!verifiedPassword) throw new IncorrectEmailOrPasswordError();
    const accessTokenData = this.authService.generateAccessToken({ userId: user.id });
    const refreshTokenData = this.authService.generateRefreshToken({ userId: user.id });
    return { accessTokenData, refreshTokenData };
  }

  public async refreshToken(refreshToken: string): Promise<AccessTokenAuthResponse> {
    const isBanned = await this.banTokensRepository.isBanned(refreshToken);
    if (isBanned) throw new NotAuthenticatedError();
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

  public logout(refreshToken?: string): true {
    if (refreshToken) this.banTokensRepository.add(refreshToken);
    return true;
  }
}
