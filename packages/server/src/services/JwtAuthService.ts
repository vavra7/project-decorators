import { sign, verify } from 'jsonwebtoken';
import { Service } from 'typedi';

export type generatedTokenData = {
  token: string;
  expiresIn: number;
};

const ACCESS_TOKEN_EXPIRATION = 30;

@Service()
export class JwtAuthService {
  public generateAccessToken(): generatedTokenData {
    return {
      token: sign({}, process.env.ACCESS_TOKEN_SECRET || 'ACCESS_TOKEN_SECRET', {
        expiresIn: ACCESS_TOKEN_EXPIRATION
      }),
      expiresIn: ACCESS_TOKEN_EXPIRATION
    };
  }

  public verifyAccessToken(token: string): boolean {
    try {
      verify(token, process.env.ACCESS_TOKEN_SECRET || 'ACCESS_TOKEN_SECRET');
    } catch {
      return false;
    }
    return true;
  }
}
