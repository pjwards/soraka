import { Strategy } from 'passport';
import { Request } from 'express';
import {
  AccessTokenStrategyOptions,
  AccessTokenStrategyVerify
} from './access-token.interfaces';
import { User } from '../../models';

export class AccessTokenStrategy extends Strategy {

  public readonly name: string;

  private readonly verify: AccessTokenStrategyVerify;

  constructor(verify: AccessTokenStrategyVerify, options?: AccessTokenStrategyOptions) {
    super();
    if (!verify) throw new Error('Access Token authentication strategy requires a verify function');

    this.name = 'access-token';
    this.verify = verify;
  }

  authenticate(req: Request, options?: object): void {
    const accessToken: string = req.headers['access-token'] as string;
    if (!accessToken) {
      return this.fail(400);
    }

    this.verify(accessToken, (err: Error | null, user?: User | null): void => {
      if (err) {
        return this.error(err);
      }
      if (!user) {
        return this.fail(400);
      } else {
        this.success(user);
      }
    });
  }
}