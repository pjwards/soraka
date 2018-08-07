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

export class AuthController {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
    @repository(PictureRepository) public pitureRepository: PictureRepository,
    @inject(AuthenticationBindings.CURRENT_USER) private user: User,
  ) {
  }

  @authenticate('AccessTokenStrategy')
  @get('/login')
  async login(): Promise<UserInterface> {
    const picture: Picture = await this.pitureRepository.findById(
      this.user.pictureId,
    );

    return Promise.resolve<UserInterface>({
      id: this.user.id,
      email: this.user.email,
      name: this.user.name,
      picture: picture,
    } as UserInterface);
  }
}
