import {
  Model,
  DataTypes,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association,
  Sequelize,
} from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { hashSync } from 'bcrypt';
import { MAX_LOGIN_LENGTH, DEFAULT_SALT_ROUNDS } from '../core/constants';
import { UserAttributes, UserCreationAttributes } from '../core/types/user';
import { Group } from './Group';
import { AuthToken } from './AuthToken';

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public static associations: {
    groups: Association<User, Group>;
    tokens: Association<User, AuthToken>;
  };

  public id!: string;
  public login!: string;
  public password!: string;
  public age!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getGroups!: BelongsToManyGetAssociationsMixin<Group>;
  public removeGroups!: BelongsToManyRemoveAssociationsMixin<Group, string>;
  public addGroup!: BelongsToManyAddAssociationMixin<Group, string>;
  public hasGroup!: BelongsToManyHasAssociationMixin<Group, string>;
  public countGroups!: BelongsToManyCountAssociationsMixin;
  public createGroup!: BelongsToManyCreateAssociationMixin<Group>;

  public getTokens!: HasManyGetAssociationsMixin<AuthToken>;
  public removeAuthToken!: HasManyRemoveAssociationMixin<AuthToken, string>;
  public removeAuthTokens!: HasManyRemoveAssociationsMixin<AuthToken, string>;
  public addAuthToken!: HasManyAddAssociationMixin<AuthToken, string>;
  public addAuthTokens!: HasManyAddAssociationsMixin<AuthToken, string>;
  public hasAuthToken!: HasManyHasAssociationMixin<AuthToken, string>;
  public hasAuthTokens!: HasManyHasAssociationsMixin<AuthToken, string>;
  public countAuthTokens!: HasManyCountAssociationsMixin;
  public createAuthToken!: HasManyCreateAssociationMixin<AuthToken>;

  public readonly groups?: Group[];
  public readonly tokens?: AuthToken[];
}

export function initUser(sequelize: Sequelize): void {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        autoIncrement: true,
        primaryKey: true,
      },
      login: {
        type: new DataTypes.STRING(MAX_LOGIN_LENGTH),
        allowNull: false,
      },
      password: {
        type: new DataTypes.STRING(MAX_LOGIN_LENGTH),
        allowNull: false,
        set(value) {
          this.setDataValue('password', hashSync(value, DEFAULT_SALT_ROUNDS));
        },
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: 'User',
      sequelize,
      hooks: {
        beforeCreate: (user, _) => {
          user.id = uuidv4();
        },
      },
    },
  );
}

export function associateUser(): void {
  User.belongsToMany(Group, { through: 'UserGroup', as: 'groups' });
  User.hasMany(AuthToken, { as: 'tokens' });
}

export function addScopes(sequelize: Sequelize): void {
  User.addScope('withGroups', {
    include: [
      {
        model: sequelize.models.Group,
        as: 'groups',
        attributes: ['id', 'name'],
        through: {
          attributes: [],
        },
      },
    ],
  });

  User.addScope('withTokens', {
    include: [
      {
        model: sequelize.models.AuthToken,
        as: 'tokens',
        attributes: ['id', 'token'],
      },
    ],
  });
}
