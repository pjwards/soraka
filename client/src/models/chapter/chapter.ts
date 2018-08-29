import {
  ChapterInterface,
  UserInterface,
} from '@/shared';

export class Chapter implements ChapterInterface {
  public id: number | null;
  public user: UserInterface | null;
  public title: string;
  public description: string | null;
  public createDate: Date | null;
  public updateDate: Date | null;
  public lastReadDate: Date | null;
  public readCount: number | null;
  public userCount: number | null;
  public userScore: number | null;
  public testCount: number | null;
  public testScore: number | null;
  public open: boolean | null;


  constructor(chapter: ChapterInterface) {
    this.id = chapter.id;
    this.user = chapter.user;
    this.title = chapter.title;
    this.description = chapter.description;
    this.createDate = chapter.createDate;
    this.updateDate = chapter.updateDate;
    this.lastReadDate = chapter.lastReadDate;
    this.readCount = chapter.readCount;
    this.userCount = chapter.userCount;
    this.userScore = chapter.userScore;
    this.testCount = chapter.testCount;
    this.testScore = chapter.testScore;
    this.open = chapter.open;
  }
}
