import { Dialect } from 'sequelize';

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
