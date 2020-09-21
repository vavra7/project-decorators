import { Authorized, Mutation, Query, Resolver } from 'type-graphql';
import { UserHandler } from '../handlers';
import { User } from '../model/User';

@Resolver()
export class UserResolver {
  private handler: UserHandler;

  constructor() {
    this.handler = new UserHandler();
  }

  @Query(() => String)
  public getUser(): string {
    return this.handler.getUser();
  }

  @Authorized()
  @Mutation(() => User)
  public createUser(): User {
    return this.handler.createUser({
      firstName: 'asdf',
      lastName: 'asdf'
    });
  }
}
