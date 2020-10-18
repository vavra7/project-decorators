import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { AuthChecker } from 'type-graphql';
import { authChecker } from '../utils';

export const apolloAuthChecker: AuthChecker<ExpressContext> = ({ context }) => {
  return authChecker(context.req);
};
