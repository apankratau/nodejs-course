import {
  Model,
  DataTypes,
  Sequelize,
  Association,
  BelongsToGetAssociationMixin,
  BelongsToCreateAssociationMixin,
  BelongsToSetAssociationMixin,
} from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { AuthTokenAttributes, AuthTokenCreationAttributes } from '../core/types/auth';
import { User } from './User';

export class AuthToken extends Model<AuthTokenAttributes, AuthTokenCreationAttributes> implements AuthTokenAttributes {
  public static associations: {
    user: Association<AuthToken, User>;
  };

  public id!: string;
  public token!: string;
  public UserId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getUser!: BelongsToGetAssociationMixin<User>;
  public setUser!: BelongsToSetAssociationMixin<User, string>;
  public createUser!: BelongsToCreateAssociationMixin<User>;

  public readonly user?: User;
}

export function initAuthToken(sequelize: Sequelize): void {
  AuthToken.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      UserId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'User',
          key: 'id',
        },
      },
    },
    {
      tableName: 'AuthToken',
      sequelize,
      hooks: {
        beforeCreate: (authToken, _) => {
          authToken.id = uuidv4();
        },
      },
    },
  );
}

export function associateAuthToken(): void {
  AuthToken.belongsTo(User);
}
