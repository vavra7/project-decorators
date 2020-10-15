import { Request } from 'express';
import { Container } from 'typedi';
import { NotAuthenticatedError } from '../../errors';
import { JwtAuthService } from '../../services';

export function authCheckerCommon(req: Request): never | true {
  const accessToken = req.get('Authorization')?.replace('Bearer ', '');
  if (!accessToken) throw new NotAuthenticatedError();
  const authService = Container.get(JwtAuthService);
  const tokenVerifyPayload = authService.verifyAccessToken(accessToken);
  if (!tokenVerifyPayload) throw new NotAuthenticatedError();
  req.context.userId = tokenVerifyPayload.userId;
  return true;
}
