import {
  repository
} from '@loopback/repository';
import {
  get,
} from '@loopback/rest';
import {
  AuthenticationBindings,
  authenticate,
} from '@loopback/authentication';
import {
  Getter,
  inject,
} from '@loopback/context';
import {
  User,
  Picture,
} from '../models';
import {
  UserRepository,
  PictureRepository,
} from '../repositories';
import { UserInterface } from '../shared';

export class AuthController {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
    @repository(PictureRepository) public pitureRepository: PictureRepository,
    @inject.getter(AuthenticationBindings.CURRENT_USER) private getCurrentUser: Getter<User>,
  ) {
  }

  @authenticate('AccessTokenStrategy')
  @get('/login')
  async login(): Promise<UserInterface> {
    const user: User = await this.getCurrentUser();
    const picture: Picture = await this.pitureRepository.findById(
      user.pictureId,
    );

    return Promise.resolve<UserInterface>({
      id: user.id,
      email: user.email,
      name: user.name,
      picture: picture,
      role: user.role,
    } as UserInterface);
  }
}
