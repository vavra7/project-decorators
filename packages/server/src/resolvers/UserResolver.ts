import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import { User } from '../entities';
import { UserHandler } from '../handlers';
import { RegisterUserInput } from '../model';

@Resolver()
export class UserResolver {
  @Inject()
  private readonly handler: UserHandler;

  @Authorized()
  @Query(() => User)
  public meUser(): Promise<User> {
    return this.handler.getMeUser();
  }

  @Mutation(() => User)
  public registerUser(
    @Arg('data')
    data: RegisterUserInput
  ): Promise<User> {
    return this.handler.registerUser(data);
  }
}
