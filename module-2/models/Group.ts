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
import { GroupAttributes, GroupCreationAttributes, Permission } from '../core/types/group';
import { User } from './User';

export class Group extends Model<GroupAttributes, GroupCreationAttributes> implements GroupAttributes {
  public static associations: {
    users: Association<Group, User>;
  };

  public id!: string;
  public name!: string;
  public permissions!: Array<Permission>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getUsers!: BelongsToManyGetAssociationsMixin<User>;
  public removeUsers!: BelongsToManyRemoveAssociationsMixin<User, string>;
  public addUser!: BelongsToManyAddAssociationMixin<User, string>;
  public hasUser!: BelongsToManyHasAssociationMixin<User, string>;
  public countUsers!: BelongsToManyCountAssociationsMixin;
  public createUser!: BelongsToManyCreateAssociationMixin<User>;

  public readonly users?: User[];
}

export function initGroup(sequelize: Sequelize): void {
  Group.init(
    {
      id: {
        type: DataTypes.UUID,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      permissions: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
    },
    {
      tableName: 'Group',
      sequelize,
      hooks: {
        beforeCreate: (group, _) => {
          group.id = uuidv4();
        },
      },
    },
  );
}

export function associateGroup(): void {
  Group.belongsToMany(User, { through: 'UserGroup', as: 'users' });
}

export function addScopes(sequelize: Sequelize): void {
  Group.addScope('withUsers', {
    include: [
      {
        model: sequelize.models.User,
        as: 'users',
        attributes: ['id', 'login', 'age'],
        through: {
          attributes: [],
        },
      },
    ],
  });
}
