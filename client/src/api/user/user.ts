import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import axios from 'axios';

import { User } from '@/models/user';
import { from } from '@/utils/http';
import { getLoginStatus } from '@/api/facebook';
import { StatusResponse } from '@/facebook.interfaces';

export function signin(): Observable<User> {
  // getLoginStatus()
  //   .pipe(flatMap((response: StatusResponse): User => {
  //     response
  //     return new User(response.authResponse)
  // })
  //   .subscribe((response) => {
  //   console.log(response)
  // });
  // TODO 메서드 구현
  return from(axios.post('/user', null));
}
