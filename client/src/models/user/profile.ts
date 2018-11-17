import { UserProfileInterface } from '@/types/domain/inteface/user';

export class Profile implements UserProfileInterface {
  public name: string;
  public gender: string;
  public location: string;
  public website: string;
  public picture: string;

  constructor(profile: UserProfileInterface) {
    this.name = profile.name;
    this.gender = profile.gender;
    this.location = profile.location;
    this.website = profile.website;
    this.picture = profile.picture;
  }
}
