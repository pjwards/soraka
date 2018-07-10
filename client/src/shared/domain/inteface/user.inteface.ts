import PictureInterface from "./picture.inteface";

export default interface UserInterface {
  id: string;
  email: string;
  name: string;
  picture?: PictureInterface;
}
