import { UserInterface } from './user';

export interface ChapterInterface {
  id: number | null;
  user: UserInterface | null;
  title: string;
  description: string | null;
  createDate: Date | null;
  updateDate: Date | null;
  lastReadDate: Date | null;
  readCount: number | null;
  userCount: number | null;
  userScore: number | null;
  testCount: number | null;
  testScore: number | null;
  open: boolean | null;
}
