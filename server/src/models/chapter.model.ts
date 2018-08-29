import {Entity, model, property} from '@loopback/repository';

@model()
export class Chapter extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
  })
  id: number;

  @property({
    type: 'number',
    required: true,
  })
  userId: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    default: '',
  })
  description?: string;

  @property({
    type: 'date',
    required: true,
  })
  createDate: string;

  @property({
    type: 'date',
    required: true,
  })
  updateDate: string;

  @property({
    type: 'date',
    required: true,
  })
  lastReadDate: string;

  @property({
    type: 'number',
    required: true,
  })
  readCount: number;

  @property({
    type: 'number',
    required: true,
  })
  userCount: number;

  @property({
    type: 'number',
    required: true,
  })
  userScore: number;

  @property({
    type: 'number',
    required: true,
  })
  testCount: number;

  @property({
    type: 'number',
    required: true,
  })
  testScore: number;

  @property({
    type: 'boolean',
    required: true,
  })
  open : boolean;

  constructor(data?: Partial<Chapter>) {
    super(data);
  }
}
