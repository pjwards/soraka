import {Entity, property, model} from '@loopback/repository';
import {Picture} from './picture.model';
import {UserInterface} from '../shared/domain/inteface/user.inteface';

@model()
export class User extends Entity {
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
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  // @property({
  //   type: 'string',
  // })
  // pictureId: string;

  @property() picture: Picture;

  getId(): string {
    return this.id;
  }
}
