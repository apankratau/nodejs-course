import { sign, verify, decode } from 'jsonwebtoken';
import { TokenPair } from '../core/types/auth';
import { AuthToken } from '../models/AuthToken';
import { User } from '../models/User';
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

  static async isAccessTokenValid(token: string): Promise<boolean> {
    const authToken = await AuthToken.findOne({
      where: { token },
    });

    return this.isTokenValid(accessTokenSecret, String(authToken?.get('token')));
  }

  static isRefreshTokenValid(token: string): boolean {
    return this.isTokenValid(refreshTokenSecret, token);
  }

  static invalidateRefreshToken(token: string): void {
    this.refreshTokens = this.refreshTokens.filter(t => t !== token);
  }

  @measure
  @logErrors
  static async createTokenPair({ id, login }: User): Promise<TokenPair> {
    const accessToken = sign({ id, login }, accessTokenSecret, { expiresIn: accessTokenLife });
    const refreshToken = sign({ id, login }, refreshTokenSecret, { expiresIn: refreshTokenLife });

    this.refreshTokens.push(refreshToken);
    await AuthToken.create({ token: accessToken, UserId: id });

    return Promise.resolve({ accessToken, refreshToken });
  }

  @measure
  @logErrors
  static async createAccessToken(token: string): Promise<Partial<TokenPair> | null> {
    if (!(this.refreshTokens.includes(token) && this.isRefreshTokenValid(token))) {
      return Promise.resolve(null);
    }

    const { id, login } = <{ id: string; login: string }>verify(token, refreshTokenSecret);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const accessToken = sign({ id, login }, accessTokenSecret, { expiresIn: accessTokenLife });
    await AuthToken.create({ token: accessToken, UserId: id });

    return Promise.resolve({ accessToken });
  }

  @measure
  @logErrors
  static async logout(token: string): Promise<void> {
    this.invalidateRefreshToken(token);

    const { id } = <{ id: string }>decode(token);
    await AuthToken.destroy({
      where: { UserId: id },
    });
  }
}
