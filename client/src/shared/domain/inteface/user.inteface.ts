import {PictureInterface} from './picture.inteface';

export interface UserInterface {
  id: string;
  email: string;
  name: string;
  picture: PictureInterface | null;
}
