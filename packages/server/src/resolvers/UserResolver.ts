import { Query, Resolver } from 'type-graphql';
import { UserHandler } from '../handlers';

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
}
