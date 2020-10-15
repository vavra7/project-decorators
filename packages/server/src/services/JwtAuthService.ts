import { sign, verify } from 'jsonwebtoken';
import { Service } from 'typedi';

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
      token: sign(payload, process.env.ACCESS_TOKEN_SECRET || 'ACCESS_TOKEN_SECRET', {
        expiresIn: this.accessTokenExpiration
      }),
      expiresIn: this.accessTokenExpiration
    };
  }

  public generateRefreshToken(payload: TokenPayload): GeneratedTokenData {
    return {
      token: sign(payload, process.env.REFRESH_TOKEN || 'REFRESH_TOKEN', {
        expiresIn: this.refreshTokenExpiration
      }),
      expiresIn: this.refreshTokenExpiration
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

  public verifyRefreshToken(token: string): null | TokenVerifyPayload {
    let tokenVerifyPayload: TokenVerifyPayload;
    try {
      tokenVerifyPayload = verify(token, process.env.REFRESH_TOKEN || 'REFRESH_TOKEN') as any;
    } catch {
      return null;
    }
    return tokenVerifyPayload;
  }
}
