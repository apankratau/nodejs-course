import { sign, verify } from 'jsonwebtoken';
import { TokenPair } from '../core/types/auth';
import measure from '../decorators/measure';
import logErrors from '../decorators/logErrors';

const accessTokenSecret = String(process.env.ACCESS_TOKEN_SECRET);
const accessTokenLife = Number(process.env.ACCESS_TOKEN_LIFE);
const refreshTokenSecret = String(process.env.REFRESH_TOKEN_SECRET);
const refreshTokenLife = Number(process.env.REFRESH_TOKEN_LIFE);

export default class AuthService {
  static refreshTokens: Array<string> = [];

  static isTokenValid(secret: string, token: string): boolean {
    try {
      verify(token, secret);
    } catch {
      return false;
    }

    return true;
  }

  static isAccessTokenValid(token: string): boolean {
    return this.isTokenValid(accessTokenSecret, token);
  }

  static isRefreshTokenValid(token: string): boolean {
    return this.isTokenValid(refreshTokenSecret, token);
  }

  static invalidateRefreshToken(token: string): void {
    this.refreshTokens = this.refreshTokens.filter(t => t !== token);
  }

  @measure
  @logErrors
  static createTokenPair(username: string): Promise<TokenPair> {
    const accessToken = sign({ username }, accessTokenSecret, { expiresIn: accessTokenLife });
    const refreshToken = sign({ username }, refreshTokenSecret, { expiresIn: refreshTokenLife });

    this.refreshTokens.push(refreshToken);

    return Promise.resolve({ accessToken, refreshToken });
  }

  @measure
  @logErrors
  static createAccessToken(token: string): Promise<Partial<TokenPair>> {
    const { username } = <{ username: string }>verify(token, refreshTokenSecret);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const accessToken = sign({ username }, accessTokenSecret, { expiresIn: accessTokenLife });

    return Promise.resolve({ accessToken });
  }
}
