import { sign, verify } from 'jsonwebtoken';
import { Service } from 'typedi';

export interface TokenGenerateData {
  token: string;
  expiresIn: number;
}

export interface TokenPayload {
  userId: string;
}

export interface TokenVerifyPayload extends TokenPayload {
  iat: number;
  exp: number;
}

const ACCESS_TOKEN_EXPIRATION = 3000;

@Service()
export class JwtAuthService {
  public generateAccessToken(payload: TokenPayload): TokenGenerateData {
    return {
      token: sign(payload, process.env.ACCESS_TOKEN_SECRET || 'ACCESS_TOKEN_SECRET', {
        expiresIn: ACCESS_TOKEN_EXPIRATION
      }),
      expiresIn: ACCESS_TOKEN_EXPIRATION
    };
  }

  public verifyAccessToken(token: string): null | TokenVerifyPayload {
    let tokenVerifyPayload: TokenVerifyPayload;
    try {
      tokenVerifyPayload = verify(
        token,
        process.env.ACCESS_TOKEN_SECRET || 'ACCESS_TOKEN_SECRET'
      ) as any;
    } catch {
      return null;
    }
    return tokenVerifyPayload;
  }
}
