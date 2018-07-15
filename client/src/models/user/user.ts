import { UserInterface } from '@/shared';
import { Picture } from '@/models/picture/picture';

export class User implements UserInterface {
  public id: string;
  public email: string;
  public name: string;
  public picture?: Picture;

  constructor(id: string, email: string, name: string, picture?: Picture) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.picture = picture;
  }
}
