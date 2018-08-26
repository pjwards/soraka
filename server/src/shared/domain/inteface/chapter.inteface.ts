import { UserInterface } from './user.inteface';

export interface ChapterInterface {
  id: number | null;
  user: UserInterface;
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
  private: boolean | null;
}
