import {Filter, Where, repository} from '@loopback/repository';
import {
  post,
  param,
  get,
  put,
  patch,
  del,
  requestBody
} from '@loopback/rest';
import {User} from '../models';
import {UserRepository} from '../repositories';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository : UserRepository,
  ) {}

  @post('/users')
  async create(@requestBody() obj: User)
    : Promise<User> {
    return await this.userRepository.create(obj);
  }

  @get('/users/count')
  async count(@param.query.string('where') where: Where): Promise<number> {
    return await this.userRepository.count(where);
  }

  @get('/users')
  async find(@param.query.string('filter') filter: Filter)
    : Promise<User[]> {
    return await this.userRepository.find(filter);
  }

  @patch('/users')
  async updateAll(
    @param.query.string('where') where: Where,
    @requestBody() obj: User
  ): Promise<number> {
    return await this.userRepository.updateAll(where, obj);
  }

  @del('/users')
  async deleteAll(@param.query.string('where') where: Where): Promise<number> {
    return await this.userRepository.deleteAll(where);
  }

  @get('/users/{id}')
  async findById(@param.path.string('id') id: string): Promise<User> {
    return await this.userRepository.findById(id);
  }

  @patch('/users/{id}')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() obj: User
  ): Promise<boolean> {
    return await this.userRepository.updateById(id, obj);
  }

  @del('/users/{id}')
  async deleteById(@param.path.string('id') id: string): Promise<boolean> {
    return await this.userRepository.deleteById(id);
  }
}
