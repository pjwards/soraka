import {
  DefaultCrudRepository,
  juggler,
} from '@loopback/repository';
import { Picture } from '../models';
import { inject } from '@loopback/core';

export class PictureRepository extends DefaultCrudRepository<Picture,
  typeof Picture.prototype.id> {
  constructor(
    @inject('datasources.db') protected datasource: juggler.DataSource,
  ) {
    super(Picture, datasource);
  }
}
