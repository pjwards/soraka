import {Entity, property, model} from '@loopback/repository';
import { Picture } from './picture.model';

@model()
export class User extends Entity {
  @property({
    id: true,
  })
  id: string;

  @property({
    required: true,
  })
  email: string;

  @property({
    required: true,
  })
  name: string;

  @property()
  picture?: Picture;

  getId() {
    return this.id;
  }
}
