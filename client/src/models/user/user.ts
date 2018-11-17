import { UserInterface } from '@/types/domain/inteface/user';
import { Profile } from '@/models/user/profile';

export class User implements UserInterface {
  public email: string;
  public profile?: Profile;

  constructor(user: UserInterface) {
    this.email = user.email;

    if (user.profile) {
      this.profile = new Profile(user.profile);
    }
  }
}
