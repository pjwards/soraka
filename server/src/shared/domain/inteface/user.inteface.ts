import {PictureInterface} from './picture.inteface';

export interface UserInterface {
  id: number | null;
  email: string;
  name: string;
  picture: PictureInterface | null;
}
