import {
  DefaultCrudRepository,
  juggler,
} from '@loopback/repository';
import { Chapter } from '../models';
import { inject } from '@loopback/core';

export class ChapterRepository extends DefaultCrudRepository<Chapter,
  typeof Chapter.prototype.id> {
  constructor(
    @inject('datasources.db') protected datasource: juggler.DataSource,
  ) {
    super(Chapter, datasource);
  }
}
