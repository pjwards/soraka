import { Filter, Where } from '@loopback/repository';
import { User } from '../models';
import { UserRepository } from '../repositories';
export declare class UserController {
    userRepository: UserRepository;
    constructor(userRepository: UserRepository);
    create(obj: User): Promise<User>;
    count(where: Where): Promise<number>;
    find(filter: Filter): Promise<User[]>;
    updateAll(where: Where, obj: User): Promise<number>;
    deleteAll(where: Where): Promise<number>;
    findById(id: string): Promise<User>;
    updateById(id: string, obj: User): Promise<boolean>;
    deleteById(id: string): Promise<boolean>;
}
