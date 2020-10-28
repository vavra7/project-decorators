import { sign, verify } from 'jsonwebtoken';
import { Service } from 'typedi';
import { accessTokenSecret, refreshTokenSecret } from '../config';

export interface GeneratedTokenData {
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

@Service()
export class JwtAuthService {
  private readonly accessTokenExpiration = 60 * 15;
  private readonly refreshTokenExpiration = 60 * 60 * 24 * 30;

  public generateAccessToken(payload: TokenPayload): GeneratedTokenData {
    return {
      token: sign(payload, accessTokenSecret, {
        expiresIn: this.accessTokenExpiration
      }),
      expiresIn: this.accessTokenExpiration
    };
  }

  public generateRefreshToken(payload: TokenPayload): GeneratedTokenData {
    return {
      token: sign(payload, refreshTokenSecret, {
        expiresIn: this.refreshTokenExpiration
      }),
      expiresIn: this.refreshTokenExpiration
    };
  }

  public verifyAccessToken(token: string): null | TokenVerifyPayload {
    let tokenVerifyPayload: TokenVerifyPayload;
    try {
      tokenVerifyPayload = verify(token, accessTokenSecret) as any;
    } catch {
      return null;
    }
    return tokenVerifyPayload;
  }

  public verifyRefreshToken(token: string): null | TokenVerifyPayload {
    let tokenVerifyPayload: TokenVerifyPayload;
    try {
      tokenVerifyPayload = verify(token, refreshTokenSecret) as any;
    } catch {
      return null;
    }
    return tokenVerifyPayload;
  }
}
