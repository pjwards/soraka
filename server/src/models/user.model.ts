import {Entity, property, model} from '@loopback/repository';
import {Picture} from './picture.model';
import {UserInterface} from '../shared/domain/inteface/user.inteface';

@model()
export class User extends Entity implements UserInterface {
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

  @property() picture?: Picture;

  getId(): string {
    return this.id;
  }
}
