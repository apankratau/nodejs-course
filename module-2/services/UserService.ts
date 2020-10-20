import { Op } from 'sequelize';
import { User } from '../models/User';
import measure from '../decorators/measure';
import logErrors from '../decorators/logErrors';

export default class UserService {
  @measure
  @logErrors
  static getAll(): Promise<User[]> {
    return User.scope('withGroups').findAll();
  }

  @measure
  @logErrors
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

  @measure
  @logErrors
  static getById(id: string): Promise<User | null> {
    return User.scope('withGroups').findByPk(id);
  }

  @measure
  @logErrors
  static create({ login, password, age }: User): Promise<User> {
    return User.create({
      login,
      password,
      age,
    });
  }

  @measure
  @logErrors
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

  @measure
  @logErrors
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
