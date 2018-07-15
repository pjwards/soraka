import { PictureInterface } from '@/shared';

export class Picture implements PictureInterface {
  public id: string;
  public url: string;
  public width: number;
  public height: number;
  public silhouette: boolean;

  constructor(id: string, url: string, width: number, height: number, silhouette: boolean = false) {
    this.id = id;
    this.url = url;
    this.width = width;
    this.height = height;
    this.silhouette = silhouette;
  }
}
