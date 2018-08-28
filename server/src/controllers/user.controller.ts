import {
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  authenticate,
} from '@loopback/authentication';
import {
  Picture,
  User
} from '../models';
import {
  PictureRepository,
  UserRepository
} from '../repositories';
import { UserInterface } from '../shared';
import { Role } from '../shared/domain/enum';

export class UserController {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
    @repository(PictureRepository) public pitureRepository: PictureRepository,
    // @inject.getter(AuthenticationBindings.CURRENT_USER) private user: User,
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
      role: Role.User,
      pictureId: picture ? picture.id : null,
    } as Partial<User>);

    return Promise.resolve<UserInterface>({
      id: createdUser.id,
      email: createdUser.email,
      name: createdUser.name,
      picture: picture,
      role: createdUser.role,
    } as UserInterface);
  }

  @authenticate('AccessTokenStrategy', {role: Role.Adimn})
  @get('/users/count')
  async count(@param.query.string('where') where: Where): Promise<number> {
    return await this.userRepository.count(where);
  }

  @authenticate('AccessTokenStrategy', {role: Role.Adimn})
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
            role: user.role,
          } as UserInterface;
        },
      ),
    );
  }

  @authenticate('AccessTokenStrategy', {role: Role.Adimn})
  @patch('/users')
  async updateAll(
    @requestBody() user: User,
    @param.query.string('where') where: Where,
  ): Promise<number> {
    return await this.userRepository.updateAll(user, where);
  }

  @authenticate('AccessTokenStrategy', {role: Role.Adimn})
  @del('/users')
  async deleteAll(@param.query.string('where') where: Where): Promise<number> {
    return await this.userRepository.deleteAll(where);
  }

  @authenticate('AccessTokenStrategy', {role: Role.Adimn})
  @get('/users/{id}')
  async findById(@param.path.number('id') id: number): Promise<User> {
    return await this.userRepository.findById(id);
  }

  @authenticate('AccessTokenStrategy', {role: Role.Adimn})
  @patch('/users/{id}')
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() user: User,
  ): Promise<boolean> {
    return await this.userRepository.updateById(id, user);
  }

  @authenticate('AccessTokenStrategy', {role: Role.Adimn})
  @del('/users/{id}')
  async deleteById(@param.path.number('id') id: number): Promise<boolean> {
    return await this.userRepository.deleteById(id);
  }
}
