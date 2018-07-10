import {Entity, property, model} from '@loopback/repository';
import PictureInterface from '../shared/domain/inteface/picture.inteface';

@model()
export class Picture extends Entity implements PictureInterface {
  @property({
    id: true,
  })
  id: string;

  @property({
    required: true,
  })
  url: string;

  @property({
    required: true,
  })
  width: number;

  @property({
    required: true,
  })
  height: number;

  @property({
    required: true,
  })
  silhouette: boolean;

  getId(): string {
    return this.id;
  }
}
