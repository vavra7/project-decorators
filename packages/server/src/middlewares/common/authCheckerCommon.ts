import { Request } from 'express';
import { Container } from 'typedi';
import { NotAuthenticatedError } from '../../errors';
import { JwtAuthService } from '../../services';

export function authCheckerCommon(req: Request): never | true {
  const accessToken = req.headers.authorization?.replace('Bearer ', '');
  if (!accessToken) throw new NotAuthenticatedError();
  const authService = Container.get(JwtAuthService);
  const verified = authService.verifyAccessToken(accessToken);
  if (!verified) throw new NotAuthenticatedError();
  return true;
}
