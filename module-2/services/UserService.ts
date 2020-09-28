import { Op } from 'sequelize';
import { User } from '../models/User';

export default class UserService {
  static getAll(): Promise<User[]> {
    return User.scope('withGroups').findAll();
  }

  static getAutosuggested(loginSubstring: string, limit: number): Promise<User[]> {
    return User.scope('withGroups').findAll({
      where: {
        login: {
          [Op.substring]: loginSubstring,
        },
      },
      limit,
    });
  }

  static getById(id: string): Promise<User | null> {
    return User.scope('withGroups').findByPk(id);
  }

  static create({ login, password, age }: User): Promise<User> {
    return User.create({
      login,
      password,
      age,
    });
  }

  static async update(id: string, { login, password, age }: User): Promise<[User, boolean | null] | null> {
    const user = await UserService.getById(id);

    if (!user) {
      return null;
    }

    return User.upsert(
      {
        id,
        login: login ?? user.login,
        password: password ?? user.password,
        age: age ?? user.age,
      },
      { returning: true },
    );
  }

  static async delete(id: string): Promise<number | null> {
    const user = await User.findByPk(id);

    if (!user) {
      return null;
    }

    const groups = await user.getGroups();
    await user.removeGroups(groups);

    return User.destroy({
      where: {
        id,
      },
    });
  }
}
