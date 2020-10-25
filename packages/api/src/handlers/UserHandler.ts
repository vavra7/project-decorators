import { Route } from '@project-decorators/shared';
import { Inject, Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { clientUrl, defaultLang } from '../config';
import { User } from '../entities';
import { DataNotFoundError, IncorrectTokenError } from '../errors';
import { RegisterUserInput } from '../models';
import { ConfirmEmailRepository, UserRepository } from '../repositories';
import { BcryptPasswordService, NodemailerService } from '../services';
import { routesDefinition } from '../utils';

@Service()
export class UserHandler {
  @Inject()
  private readonly passwordService: BcryptPasswordService;

  @Inject()
  private readonly emailClient: NodemailerService;

  @Inject()
  private readonly confirmEmailRepository: ConfirmEmailRepository;

  @InjectRepository()
  private readonly userRepository: UserRepository;

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
    const user = await this.userRepository.create(registerUserInput);
    const token = await this.confirmEmailRepository.create(user.id);
    const lang = user.preferredLanguage || defaultLang;
    const routeDef = routesDefinition.find(item => item.name === Route.ConfirmEmail)!;
    const pathname = routeDef.pathname[lang];
    const url = new URL(pathname.replace('[token]', token), clientUrl).toString();
    this.emailClient.sendEmail({
      from: '"Project Decorators 👻" <project-decorators@example.com>',
      to: user.email,
      subject: 'Confirm Email ✔',
      html: `<a href="${url}">${url}</a>`
    });
    return user;
  }

  public async confirmEmail(token: string): Promise<User> {
    const userId = await this.confirmEmailRepository.findAndDelete(token);
    if (!userId) throw new IncorrectTokenError();
    const user = this.userRepository.setConfirmed(userId);
    return user;
  }
}
