import { Model, DataTypes, Sequelize } from 'sequelize';
import { UserGroupAttributes } from '../core/types/userGroup';

export class UserGroup extends Model<UserGroupAttributes> implements UserGroupAttributes {
  public UserId!: string;
  public GroupId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function initUserGroup(sequelize: Sequelize): void {
  UserGroup.init(
    {
      UserId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      GroupId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Group',
          key: 'id',
        },
      },
    },
    {
      tableName: 'UserGroup',
      sequelize,
    },
  );
}
