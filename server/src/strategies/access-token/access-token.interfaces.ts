import { User } from '../../models';
import { Role } from '../../shared/domain/enum';

export interface AccessTokenStrategyOptions {
  role?: Role;
}

export interface AccessTokenStrategyVerify {
  (
    accessToken: string,
    cb: (err: Error | null, user?: User | null) => void,
  ): void
}
