import { DefaultCrudRepository, juggler, Options } from '@loopback/repository';
import { User } from '../models';
export declare class UserRepository extends DefaultCrudRepository<User, typeof User.prototype.id> {
    protected datasource: juggler.DataSource;
    constructor(datasource: juggler.DataSource);
    create(entity: Partial<User>, options?: Options): Promise<User>;
    findByEmail(email: string): Promise<User[]>;
}
