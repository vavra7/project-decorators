import { Inject, Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { User } from '../entities';
import { DataNotFoundError } from '../errors';
import { RegisterUserInput } from '../models';
import { UserRepository } from '../repositories';
import { BcryptPasswordService } from '../services';

@Service()
export class UserHandler {
  @Inject()
  private readonly passwordService: BcryptPasswordService;

  @InjectRepository()
  public userRepository: UserRepository;

  public getUser(): string {
    return 'This is an user';
  }

  public async me(userId: User['id']): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new DataNotFoundError('User');
    return user;
  }

  public async register(registerUserInput: RegisterUserInput): Promise<User> {
    registerUserInput.password = await this.passwordService.hash(registerUserInput.password);
    return this.userRepository.create(registerUserInput);
  }
}