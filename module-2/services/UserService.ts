import { Op } from 'sequelize';
import User from '../models/User';

export default class UserService {
  static getAll(): Promise<User[]> {
    return User.findAll();
  }

  static getAutosuggested(loginSubstring: string, limit: number): Promise<User[]> {
    return User.findAll({
      where: {
        login: {
          [Op.substring]: loginSubstring,
        },
      },
      limit,
    });
  }

  static getById(id: number): Promise<User | null> {
    return User.findByPk(id);
  }

  static create({ login, password, age }: User): Promise<User> {
    return User.create({
      login,
      password,
      age,
    });
  }

  static async update(id: number, { login, password, age }: User): Promise<[User, boolean | null] | null> {
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

  static delete(id: number): Promise<number> {
    return User.destroy({
      where: {
        id,
      },
    });
  }
}
