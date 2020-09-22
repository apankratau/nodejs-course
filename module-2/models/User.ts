import {
  Model,
  DataTypes,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  Association,
  Sequelize,
} from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { MAX_LOGIN_LENGTH } from '../core/constants';
import { UserAttributes, UserCreationAttributes } from '../core/types/user';
import { Group } from './Group';

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public static associations: {
    groups: Association<User, Group>;
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

  public readonly groups?: Group[];
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
}
