import { Sequelize, Dialect } from 'sequelize';
import { initUser, associateUser, addScopes as addUserScopes } from '../models/User';
import { initGroup, associateGroup, addScopes as addGroupScopes } from '../models/Group';
import { initUserGroup } from '../models/UserGroup';
import { initAuthToken, associateAuthToken } from '../models/AuthToken';
import logger from '../core/logger';

const dbName = String(process.env.DB_NAME);
const dbUsername = String(process.env.DB_USERNAME);
const dbPassword = String(process.env.DB_PASSWORD);
const dbHost = String(process.env.DB_HOST);
const dbDialect = String(process.env.DB_DIALECT);

const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  dialect: dbDialect as Dialect,
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
