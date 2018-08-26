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
  authenticate,
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
  async create(@requestBody() user: UserInterface): Promise<UserInterface> {
    let picture: Picture | null = null;

    const count: number = await this.userRepository.count({ email: user.email });

    if (count > 0) {
      throw new Error('Alreay user exists.');
    }

    if (user.picture) {
      picture = await this.pitureRepository.create(user.picture as Partial<Picture>);
      delete user.picture;
    }

    const createdUser: User = await this.userRepository.create({
      ...user,
      pictureId: picture ? picture.id : null,
    } as Partial<User>);

    return Promise.resolve<UserInterface>({
      id: createdUser.id,
      email: createdUser.email,
      name: createdUser.name,
      picture: picture,
    } as UserInterface);
  }

  @authenticate('AccessTokenStrategy')
  @get('/users/count')
  async count(@param.query.string('where') where: Where): Promise<number> {
    return await this.userRepository.count(where);
  }

  @authenticate('AccessTokenStrategy')
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

  @authenticate('AccessTokenStrategy')
  @patch('/users')
  async updateAll(
    @requestBody() user: User,
    @param.query.string('where') where: Where,
  ): Promise<number> {
    return await this.userRepository.updateAll(user, where);
  }

  @authenticate('AccessTokenStrategy')
  @del('/users')
  async deleteAll(@param.query.string('where') where: Where): Promise<number> {
    return await this.userRepository.deleteAll(where);
  }

  @authenticate('AccessTokenStrategy')
  @get('/users/{id}')
  async findById(@param.path.number('id') id: number): Promise<User> {
    return await this.userRepository.findById(id);
  }

  @authenticate('AccessTokenStrategy')
  @patch('/users/{id}')
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() user: User,
  ): Promise<boolean> {
    return await this.userRepository.updateById(id, user);
  }

  @authenticate('AccessTokenStrategy')
  @del('/users/{id}')
  async deleteById(@param.path.number('id') id: number): Promise<boolean> {
    return await this.userRepository.deleteById(id);
  }
}
