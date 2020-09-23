import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { UserHandler } from '../handlers';
import { RegisterUserInput, User } from '../model/UserModel';

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

  @Mutation(() => User)
  public registerUser(
    @Arg('data')
    data: RegisterUserInput
  ): Promise<User> {
    return this.handler.registerUser(data);
  }
}
