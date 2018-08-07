import {
  Provider,
  inject,
  ValueOrPromise
} from '@loopback/context';
import { Strategy } from 'passport';
import {
  AuthenticationBindings,
  AuthenticationMetadata,
  UserProfile,
} from '@loopback/authentication';
import {
  AccessTokenStrategy
} from '../strategies/access-token/access-token.strategy';
import { AccessTokenStrategyOptions } from '../strategies/access-token/access-token.interfaces';
import {
  me,
  UserResponse
} from '../apis/facebook';
import { repository } from '@loopback/repository';
import { UserRepository } from '../repositories';
import { User } from '../models';

export class MyAuthStrategyProvider implements Provider<Strategy | undefined> {
  constructor(
    @inject(AuthenticationBindings.METADATA) private metadata: AuthenticationMetadata,
    @repository(UserRepository) public userRepository: UserRepository,
  ) {
  }

  value(): ValueOrPromise<Strategy | undefined> {
    // The function was not decorated, so we shouldn't attempt authentication
    if (!this.metadata) {
      return undefined;
    }

    const name = this.metadata.strategy;
    if (name === 'AccessTokenStrategy') {
      return new AccessTokenStrategy(
        {} as AccessTokenStrategyOptions,
        (
          accessToken: string,
          cb: (err: Error | null, user: User | null) => void,
        ) => {
          me(accessToken)
            .then((userInfo: UserResponse): Promise<User[]> =>
              this.userRepository.find({ where: { email: userInfo.email } })
            )
            .then((users: User[]) => {
              if (users.length === 0) {
                cb(null, null);
              } else {
                cb(null, users[0]);
              }
            });
        }
      );
    } else {
      return Promise.reject(`The strategy ${name} is not available.`);
    }
  }
}