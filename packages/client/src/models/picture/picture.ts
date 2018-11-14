import { PictureInterface } from 'type/domain/inteface';

export class Picture implements PictureInterface {
  public id: number | null;
  public url: string;
  public width: number;
  public height: number;
  public silhouette: boolean;

  constructor(picture: PictureInterface) {
    this.id = picture.id;
    this.url = picture.url;
    this.width = picture.width;
    this.height = picture.height;
    this.silhouette = typeof picture.silhouette === 'boolean' ? picture.silhouette : false;
  }
}
