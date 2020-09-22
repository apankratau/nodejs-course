import { Sequelize } from 'sequelize';
import { DbConfig, Envs } from '../core/types/config';
import rawConfig from '../core/config/database.json';

const env = (process.env.NODE_ENV || 'development') as Envs;
const config = rawConfig as DbConfig;
const envConfig = config[env];

const sequelize = new Sequelize(envConfig.database, envConfig.username, envConfig.password, {
  ...envConfig,
  logging: (...msg) => console.log(msg),
});

export default sequelize;
