import User from '../../models/user';

class UserService {
  async create(
    oauth,
    email,
    name,
    picture
  ) {
    let user = await this.findOneByEmail(email);

    if (user) {
      throw new Error('username exists');
    }

    const count = await this.count();
    user = await User.create(
      oauth,
      email,
      name,
      picture
    );

    if (count === 0) {
      await user.assignAdmin();
    }

    return user;
  }

  async findOneByEmail(email) {
    return User.findOneByEmail(email);
  }

  async findAll() {
    return User.find({});
  }

  async count() {
    return User.count({}).exec();
  }
}

export default new UserService();
