import { User } from '../entities';
import { RegisterUserInput } from '../model';

export class UserHandler {
  public getUser(): string {
    return 'This is an user';
  }

  public async registerUser(data: RegisterUserInput): Promise<User> {
    const user = await User.create({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password
    }).save();

    return user;
  }
}
