import { User } from '../model/User';

export class UserHandler {
  public getUser(): string {
    return 'This is an user';
  }

  public createUser(input: User): User {
    return input;
  }
}
