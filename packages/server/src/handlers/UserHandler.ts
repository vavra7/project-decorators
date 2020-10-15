import { Inject, Service } from 'typedi';
import { User } from '../entities';
import { DataNotFoundError } from '../errors';
import { RegisterUserInput } from '../model';
import { BcryptPasswordService } from '../services';

@Service()
export class UserHandler {
  @Inject()
  private readonly passwordService: BcryptPasswordService;

  public getUser(): string {
    return 'This is an user';
  }

  public async meUser(userId: User['id']): Promise<User> {
    const user = await User.findOne(userId);
    if (!user) throw new DataNotFoundError('User');
    return user;
  }

  public async registerUser(registerUserInput: RegisterUserInput): Promise<User> {
    registerUserInput.password = await this.passwordService.hash(registerUserInput.password);
    return await User.create(registerUserInput).save();
  }
}
