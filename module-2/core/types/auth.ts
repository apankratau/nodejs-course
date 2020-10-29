import { Optional } from 'sequelize';

export interface LoginAttributes {
  username: string;
  password: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface AuthTokenAttributes {
  id: string;
  token: string;
  UserId: string;
}

export interface AuthTokenCreationAttributes extends Optional<AuthTokenAttributes, 'id'> {}
