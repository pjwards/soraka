import { User } from '../../models';

export interface AccessTokenStrategyOptions {
}

export interface AccessTokenStrategyVerify {
  (
    accessToken: string,
    cb: (err: Error | null, user?: User | false) => void,
  ): void
}
