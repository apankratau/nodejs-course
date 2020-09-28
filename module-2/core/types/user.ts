import { Optional } from 'sequelize';

export interface UserAttributes {
  id: string;
  login: string;
  password: string;
  age: number;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}
