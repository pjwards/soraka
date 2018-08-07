import {Entity, property, model} from '@loopback/repository';

@model()
export class Picture extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id?: number;

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
}
