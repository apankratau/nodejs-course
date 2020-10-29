import { Sequelize } from 'sequelize';
import { DbConfig, Envs } from '../core/types/config';
import rawConfig from '../core/config/database.json';
import { initUser, associateUser, addScopes as addUserScopes } from '../models/User';
import { initGroup, associateGroup, addScopes as addGroupScopes } from '../models/Group';
import { initUserGroup } from '../models/UserGroup';
import { initAuthToken, associateAuthToken } from '../models/AuthToken';
import logger from '../core/logger';

const env = (process.env.NODE_ENV || 'development') as Envs;
const config = rawConfig as DbConfig;
const envConfig = config[env];

const sequelize = new Sequelize(envConfig.database, envConfig.username, envConfig.password, {
  ...envConfig,
  logging: sql => logger.verbose(`\x1b[36m[sequelize]\x1b[0m ${sql}`),
});

initUser(sequelize);
initGroup(sequelize);
initUserGroup(sequelize);
initAuthToken(sequelize);

associateUser();
associateGroup();
associateAuthToken();

addUserScopes(sequelize);
addGroupScopes(sequelize);

const db = {
  sequelize,
  Sequelize,
  User: sequelize.models.User,
  Group: sequelize.models.Group,
  UserGroup: sequelize.models.UserGroup,
  AuthToken: sequelize.models.AuthToken,
};

export default db;
