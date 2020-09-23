import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { AuthChecker } from 'type-graphql';

export const gqlAuthChecker: AuthChecker<ExpressContext> = () => {
  return true;
};

export const expressAuthChecker = (): boolean => {
  return true;
};
