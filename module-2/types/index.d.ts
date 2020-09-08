import { Optional, Dialect } from 'sequelize';

export type RequestProperty = 'body' | 'params' | 'query';

export interface UserAttributes {
  id: number;
  login: string;
  password: string;
  age: number;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export type Envs = 'production' | 'test' | 'development';

type DbEnvConfig = {
  username: string;
  password?: string | undefined;
  database: string;
  host: string;
  dialect: Dialect;
};

export type DbConfig = {
  [k in Envs]: DbEnvConfig;
};
