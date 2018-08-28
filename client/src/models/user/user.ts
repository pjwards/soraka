import { UserInterface, PictureInterface } from '@/shared';
import { Role } from '@/shared/domain/enum';

export class User implements UserInterface {
  public id: number | null;
  public email: string;
  public name: string;
  public picture: PictureInterface | null;
  public role: Role | null;

  constructor(user: UserInterface) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.picture = user.picture;
    this.role = user.role;
  }
}
