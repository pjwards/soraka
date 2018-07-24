import { UserInterface, PictureInterface } from '@/shared';

export class User implements UserInterface {
  public id: number | null;
  public email: string;
  public name: string;
  public picture: PictureInterface | null;

  constructor(user: UserInterface) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.picture = user.picture;
  }
}
