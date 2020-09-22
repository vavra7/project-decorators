import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { AuthChecker } from 'type-graphql';

export const gqlAuthChecker: AuthChecker<ExpressContext> = () => {
  return false;
};

export const expressAuthChecker = (): boolean => {
  return true;
};
