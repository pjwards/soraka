import {PictureInterface} from './picture.inteface';

export interface UserInterface {
  id: string | null;
  email: string;
  name: string;
  picture: PictureInterface | null;
}
