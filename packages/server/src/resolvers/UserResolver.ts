import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import { User } from '../entities';
import { UserHandler } from '../handlers';
import { RegisterUserInput } from '../model/UserModel';

@Resolver()
export class UserResolver {
  @Inject()
  private handler: UserHandler;

  @Query(() => String)
  public anotherTestGetUser(): string {
    return this.handler.getUser();
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
