import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import { Inject } from 'typedi';
import { User } from '../entities';
import { UserHandler } from '../handlers';
import { LoginUserResponse, RegisterUserInput } from '../model';

@Resolver()
export class UserResolver {
  @Inject()
  private readonly handler: UserHandler;

  @Authorized()
  @Query(() => String)
  public meUser(): string {
    return this.handler.getUser();
  }

  @Mutation(() => User)
  public registerUser(
    @Arg('data')
    data: RegisterUserInput
  ): Promise<User> {
    return this.handler.registerUser(data);
  }

  @Mutation(() => LoginUserResponse)
  public loginUser(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<LoginUserResponse> {
    return this.handler.loginUser(email, password);
  }
}
