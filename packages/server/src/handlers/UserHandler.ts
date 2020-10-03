import { Service } from 'typedi';
import { User } from '../entities';
import { RegisterUserInput } from '../model';

@Service()
export class UserHandler {
  public getUser(): string {
    return 'This is an user';
  }

  public async registerUser(registerUserInput: RegisterUserInput): Promise<User> {
    registerUserInput.hashPassword();
    const user = User.create(registerUserInput);
    await user.save();
    return user;
  }
}
