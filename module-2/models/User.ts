import { Model, DataTypes } from 'sequelize';
import sequelize from '../DAL';
import { MAX_LOGIN_LENGTH } from '../core/constants';
import { UserAttributes, UserCreationAttributes } from '../core/types/user';

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public login!: string;
  public password!: string;
  public age!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
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
    tableName: 'Users',
    sequelize,
  },
);

export default User;
