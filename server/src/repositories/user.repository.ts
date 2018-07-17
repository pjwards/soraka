import {DefaultCrudRepository, juggler, Options} from '@loopback/repository';
import {User} from '../models';
import {inject} from '@loopback/core';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id
> {
  constructor(
    @inject('datasources.db') protected datasource: juggler.DataSource,
  ) {
    super(User, datasource);
  }

  async create(entity: Partial<User>, options?: Options): Promise<User> {
    const count: number = await this.count({email: entity.email});
    console.log(entity.email, count);

    if (count > 0) {
      throw new Error('Alreay user exists.');
    }

    return super.create(entity, options);
  }

  async findByEmail(email: string): Promise<User[]> {
    return this.find({where: {email: email}});
  }
}
