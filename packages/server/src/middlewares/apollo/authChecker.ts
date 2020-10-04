import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { AuthChecker } from 'type-graphql';
import { Container } from 'typedi';
import { NotAuthenticatedError } from '../../errors';
import { JwtAuthService } from '../../services';

export const authChecker: AuthChecker<ExpressContext> = ({ context }) => {
  const accessToken = context.req.headers.authorization?.replace('Bearer ', '');
  if (!accessToken) throw new NotAuthenticatedError();
  const authService = Container.get(JwtAuthService);
  const verified = authService.verifyAccessToken(accessToken);
  if (!verified) throw new NotAuthenticatedError();
  return true;
};
