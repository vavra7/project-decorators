import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { AuthChecker } from 'type-graphql';
import { authCheckerCommon } from '../common';

export const authChecker: AuthChecker<ExpressContext> = ({ context }) => {
  return authCheckerCommon(context.req);
};
