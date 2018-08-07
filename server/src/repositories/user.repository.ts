import {
  DefaultCrudRepository,
  juggler,
} from '@loopback/repository';
import { User } from '../models';
import { inject } from '@loopback/core';

export class UserRepository extends DefaultCrudRepository<User,
  typeof User.prototype.id> {
  constructor(
    @inject('datasources.db') protected datasource: juggler.DataSource,
  ) {
    super(User, datasource);
  }

  async findByEmail(email: string): Promise<User[]> {
    return this.find({ where: { email: email } });
  }
}
