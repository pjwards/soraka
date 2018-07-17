import {Entity, property, model} from '@loopback/repository';
import {PictureInterface} from '../shared/domain/inteface/picture.inteface';

@model()
export class Picture extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  url: string;

  @property({
    type: 'number',
    required: true,
  })
  width: number;

  @property({
    type: 'number',
    required: true,
  })
  height: number;

  @property({
    type: 'boolean',
    required: false,
    default: false,
  })
  silhouette: boolean;

  getId(): string {
    return this.id;
  }
}
