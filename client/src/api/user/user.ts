import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import axios from 'axios';

import { User } from '@/models/user';
import { from } from '@/utils/http';
import { login, getUser, getLoginStatus, logout } from '@/api/facebook';
import { StatusResponse, STATUS, UserResponse } from '@/facebook.interfaces';
import { API_SERVER } from '@/settings';
import { Picture } from '@/models/picture';

export function signin(): Observable<User> {
  return getLoginStatus()
    .pipe(
      flatMap(
        (response: StatusResponse): Observable<StatusResponse> => {
          console.log(response);

          if (response.status !== STATUS.CONNECTED) {
            return login();
          }
          return logout()
            .pipe(
              flatMap(
                (): Observable<StatusResponse> => {
                  return login();
                },
              ),
            );
        },
      ),
      flatMap(
        (response: StatusResponse): Observable<UserResponse> => {
          console.log(response);

          if (response.status !== STATUS.CONNECTED) {
            throw Error('Can not connected.');
          }
          return getUser();
        },
      ),
      flatMap(
        (response: UserResponse): Observable<User> => {
          const email: string = response.email;
          const name: string = response.name;
          let picture: Picture | null = null;

          if (response.picture && response.picture.data) {
            const data = response.picture.data;
            picture = new Picture('', data.url, data.width, data.height, data.is_silhouette);
          }

          return from<User>(
            axios.post(API_SERVER + '/users', new User('', email, name, picture)),
          );
        },
      ),
    );
}
