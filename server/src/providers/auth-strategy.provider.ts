import {
  Provider,
  inject,
  ValueOrPromise
} from '@loopback/context';
import { Strategy } from 'passport';
import {
  AuthenticationBindings,
  AuthenticationMetadata,
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
import { Role } from '../shared/domain/enum';

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
    console.log(this.metadata);
    if (name === 'AccessTokenStrategy') {
      return new AccessTokenStrategy(
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
                const role: Role | undefined = this.metadata.options &&
                  (this.metadata.options as AccessTokenStrategyOptions).role;
                if (role && users[0].role !== role) {
                  cb(new Error(`Does not have authority.(${role})`), null);
                  return;
                }
                cb(null, users[0]);
              }
            })
            .catch((err: Error) => cb(err, null));
        }
      );
    } else {
      return Promise.reject(`The strategy ${name} is not available.`);
    }
  }
}