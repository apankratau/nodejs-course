import { Optional } from 'sequelize';

export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export interface GroupAttributes {
  id: string;
  name: string;
  permissions: Array<Permission>;
}

export interface GroupCreationAttributes extends Optional<GroupAttributes, 'id'> {}
