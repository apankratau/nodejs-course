import { Optional } from 'sequelize';

export interface UserAttributes {
  id: number;
  login: string;
  password: string;
  age: number;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}
