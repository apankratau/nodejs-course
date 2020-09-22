import { Group } from '../models/Group';
import { User } from '../models/User';
import { UserGroup } from '../models/UserGroup';
import db from '../DAL';

export default class GroupService {
  static getAll(): Promise<Group[]> {
    return Group.scope('withUsers').findAll();
  }

  static getById(id: string): Promise<Group | null> {
    return Group.scope('withUsers').findByPk(id);
  }

  static create({ name, permissions }: Group): Promise<Group> {
    return Group.create({
      name,
      permissions,
    });
  }

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
