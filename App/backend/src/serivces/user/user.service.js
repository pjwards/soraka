import User from '../../models/user';

class UserService {
  async create(username, password) {
    let user = await this.findOneByUsername(username);

    if (user) {
      throw new Error('username exists');
    }

    const count = await this.count();
    user = await User.create(username, password);

    if (count === 0) {
      await user.assignAdmin();
    }

    return user;
  }

  async findOneByUsername(username) {
    return User.findOneByUsername(username);
  }

  async count() {
    return User.count({}).exec();
  }
}

export default new UserService();
