export interface User {
  firstName: string;
  lastName: string;
}

export class UserHandler {
  public getUser(): string {
    return 'This is an user';
  }

  public createUser(input: User): User {
    return input;
  }
}
