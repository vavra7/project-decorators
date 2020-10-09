import { Inject, Service } from 'typedi';
import { User } from '../entities';
import { DataNotFoundError, NotAuthenticatedError } from '../errors';
import { RegisterUserInput } from '../model';
import { BcryptPasswordService, HttpContextService } from '../services';

@Service()
export class UserHandler {
  @Inject()
  private readonly passwordService: BcryptPasswordService;

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
}
