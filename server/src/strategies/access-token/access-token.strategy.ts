import { Strategy } from 'passport';
import { Request } from 'express';
import {
  AccessTokenStrategyVerify
} from './access-token.interfaces';
import { User } from '../../models';

export class AccessTokenStrategy extends Strategy {

  public readonly name: string;

  private readonly verify: AccessTokenStrategyVerify;

  constructor(verify: AccessTokenStrategyVerify) {
    super();
    if (!verify) throw new Error('Access Token authentication strategy requires a verify function');

    this.name = 'access-token';
    this.verify = verify;
  }

  authenticate(req: Request, options?: object): void {
    const accessToken: string = req.headers['access-token'] as string;
    if (!accessToken) {
      this.fail(401);
      return;
    }

    this.verify(accessToken, (err: Error | null, user?: User | null): void => {
      if (err) {
        this.error(err);
        return;
      }
      if (!user) {
        this.fail(401);
        return;
      } else {
        this.success(user);
      }
    });
  }
}