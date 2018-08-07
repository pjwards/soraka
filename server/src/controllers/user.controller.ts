import {
  Filter,
  Where,
  repository
} from '@loopback/repository';
import {
  post,
  param,
  get,
  patch,
  del,
  requestBody
} from '@loopback/rest';
import {
  AuthenticationBindings,
} from '@loopback/authentication';
import { inject } from '@loopback/context';
import {
  User,
  Picture
} from '../models';
import {
  UserRepository,
  PictureRepository
} from '../repositories';
import { UserInterface } from '../shared';

export class UserController {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
    @repository(PictureRepository) public pitureRepository: PictureRepository,
    @inject.getter(AuthenticationBindings.CURRENT_USER) private user: User,
  ) {
  }

  @post('/users')
  async create(@requestBody() obj: UserInterface): Promise<UserInterface> {
    let picture: Picture | null = null;

    const count: number = await this.userRepository.count({ email: obj.email });

    if (count > 0) {
      throw new Error('Alreay user exists.');
    }

    if (obj.picture) {
      picture = await this.pitureRepository.create(obj.picture as Partial<Picture>);
      delete obj.picture;
    }

    const user: User = await this.userRepository.create({
      ...obj,
      pictureId: picture ? picture.id : null,
    } as Partial<User>);

    return Promise.resolve<UserInterface>({
      id: user.id,
      email: user.email,
      name: user.name,
      picture: picture,
    } as UserInterface);
  }

  @get('/users/count')
  async count(@param.query.string('where') where: Where): Promise<number> {
    return await this.userRepository.count(where);
  }

  @get('/users')
  async find(
    @param.query.string('filter') filter: Filter,
  ): Promise<UserInterface[]> {
    const users: User[] = await this.userRepository.find(filter);
    return await Promise.all(
      users.map(
        async (user: User): Promise<UserInterface> => {
          const picture: Picture = await this.pitureRepository.findById(
            user.pictureId,
          );
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            picture: picture,
          } as UserInterface;
        },
      ),
    );
  }

  @patch('/users')
  async updateAll(
    @param.query.string('where') where: Where,
    @requestBody() obj: User,
  ): Promise<number> {
    return await this.userRepository.updateAll(where, obj);
  }

  @del('/users')
  async deleteAll(@param.query.string('where') where: Where): Promise<number> {
    return await this.userRepository.deleteAll(where);
  }

  @get('/users/{id}')
  async findById(@param.path.number('id') id: number): Promise<User> {
    return await this.userRepository.findById(id);
  }

  @patch('/users/{id}')
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() obj: User,
  ): Promise<boolean> {
    return await this.userRepository.updateById(id, obj);
  }

  @del('/users/{id}')
  async deleteById(@param.path.number('id') id: number): Promise<boolean> {
    return await this.userRepository.deleteById(id);
  }
}
