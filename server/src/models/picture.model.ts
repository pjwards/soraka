import {Entity, property, model} from '@loopback/repository';

@model()
export class Picture extends Entity {
  @property({
    id: true,
  })
  id?: number;

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

  getId() {
    return this.id;
  }
}
