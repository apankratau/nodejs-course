import { Group } from '../models/Group';
import { User } from '../models/User';
import { UserGroup } from '../models/UserGroup';
import db from '../DAL';
import measure from '../decorators/measure';
import logErrors from '../decorators/logErrors';

export default class GroupService {
  @measure
  @logErrors
  static getAll(): Promise<Group[]> {
    return Group.scope('withUsers').findAll();
  }

  @measure
  @logErrors
  static getById(id: string): Promise<Group | null> {
    return Group.scope('withUsers').findByPk(id);
  }

  @measure
  @logErrors
  static create({ name, permissions }: Group): Promise<Group> {
    return Group.create({
      name,
      permissions,
    });
  }

  @measure
  @logErrors
  static async update(id: string, { name, permissions }: Group): Promise<[Group, boolean | null] | null> {
    const group = await GroupService.getById(id);

    if (!group) {
      return null;
    }

    return Group.upsert(
      {
        id,
        name: name ?? group.name,
        permissions: permissions ?? group.permissions,
      },
      { returning: true },
    );
  }

  @measure
  @logErrors
  static async delete(id: string): Promise<number | null> {
    const group = await Group.findByPk(id);

    if (!group) {
      return null;
    }

    const users = await group.getUsers();
    await group.removeUsers(users);

    return Group.destroy({
      where: {
        id,
      },
    });
  }

  @measure
  @logErrors
  static addUsersToGroup(groupId: string, userIds: string[]): Promise<UserGroup[] | null> {
    return db.sequelize.transaction(async t => {
      const group = await Group.findByPk(groupId, { transaction: t });

      if (!group) {
        return null;
      }

      const users = await Promise.all(userIds.map(id => User.findByPk(id, { transaction: t })));
      const existingUsers = users.filter((user: User | null): user is User => user !== null);

      if (!existingUsers?.length) {
        return null;
      }

      const userGroups = await Promise.all(
        existingUsers.map(user => {
          const userGroup = {
            GroupId: group.id,
            UserId: user.id,
          };

          return UserGroup.create(userGroup, { transaction: t });
        }),
      );

      return userGroups;
    });
  }
}
