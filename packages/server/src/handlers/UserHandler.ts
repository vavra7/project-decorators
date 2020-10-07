import { Inject, Service } from 'typedi';
import { User } from '../entities';
import { DataNotFoundError, IncorrectEmailOrPasswordError, NotAuthenticatedError } from '../errors';
import { LoginUserResponse, RegisterUserInput } from '../model';
import { BcryptPasswordService, HttpContextService, JwtAuthService } from '../services';

@Service()
export class UserHandler {
  @Inject()
  private readonly passwordService: BcryptPasswordService;

  @Inject()
  private readonly authService: JwtAuthService;

  @Inject()
  private readonly httpContext: HttpContextService;

  public getUser(): string {
    return 'This is an user';
  }

  public async getMeUser(): Promise<User> {
    const userId = this.httpContext.get('userId');
    if (!userId) throw new NotAuthenticatedError();
    const user = await User.findOne(userId);
    if (!user) throw new DataNotFoundError('User');
    return user;
  }

  public async registerUser(registerUserInput: RegisterUserInput): Promise<User> {
    registerUserInput.password = await this.passwordService.hash(registerUserInput.password);
    return await User.create(registerUserInput).save();
  }

  public async loginUser(email: string, password: string): Promise<LoginUserResponse> {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new IncorrectEmailOrPasswordError();
    const verified = await this.passwordService.compare(password, user.password);
    if (!verified) throw new IncorrectEmailOrPasswordError();
    const { token, expiresIn } = this.authService.generateAccessToken({
      userId: user.id
    });
    return Object.assign(new LoginUserResponse(), { accessToken: token, expiresIn });
  }
}
