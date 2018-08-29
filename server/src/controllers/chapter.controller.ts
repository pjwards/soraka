import {
  Filter,
  Where,
  repository
} from '@loopback/repository';
import {
  post,
  param,
  get,
  patch,
  del,
  requestBody
} from '@loopback/rest';
import {
  Chapter,
  User,
} from '../models';
import { ChapterRepository } from '../repositories';
import {
  authenticate,
  AuthenticationBindings,
} from '@loopback/authentication';
import { inject } from '@loopback/context';

export class ChapterController {
  constructor(
    @repository(ChapterRepository)
    public chapterRepository: ChapterRepository,
    @inject.getter(AuthenticationBindings.CURRENT_USER) private user: User,
  ) {
  }

  @authenticate('AccessTokenStrategy')
  @post('/chapters')
  async create(@requestBody() chapter: Chapter)
    : Promise<Chapter> {
    chapter.userId = (this.user.id) as number;
    return await this.chapterRepository.create(chapter);
  }

  @get('/chapters/count')
  async count(@param.query.string('where') where?: Where): Promise<number> {
    return await this.chapterRepository.count(where);
  }

  @get('/chapters')
  async find(@param.query.string('filter') filter?: Filter)
    : Promise<Chapter[]> {
    return await this.chapterRepository.find(filter);
  }

  @authenticate('AccessTokenStrategy')
  @patch('/chapters')
  async updateAll(
    @requestBody() chapter: Chapter,
    @param.query.string('where') where?: Where
  ): Promise<number> {
    return await this.chapterRepository.updateAll(chapter, where);
  }

  @get('/chapters/{id}')
  async findById(@param.path.number('id') id: number): Promise<Chapter> {
    return await this.chapterRepository.findById(id);
  }

  @authenticate('AccessTokenStrategy')
  @patch('/chapters/{id}')
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() chapter: Chapter
  ): Promise<boolean> {
    return await this.chapterRepository.updateById(id, chapter);
  }

  @authenticate('AccessTokenStrategy')
  @del('/chapters/{id}')
  async deleteById(@param.path.number('id') id: number): Promise<boolean> {
    return await this.chapterRepository.deleteById(id);
  }
}
