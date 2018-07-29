import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import axios from 'axios';

import { User } from '@/models/user';
import { from } from '@/utils/http';
import { login, getUser, getLoginStatus, logout } from '@/api/facebook';
import { StatusResponse, STATUS, UserResponse } from '@/facebook.interfaces';
import { API_SERVER } from '@/settings';
import { Picture } from '@/models/picture';
import { PictureInterface } from '@/shared/domain/inteface';

export function signin(): Observable<User> {
  return getLoginStatus().pipe(
    flatMap(
      (response: StatusResponse): Observable<StatusResponse> => {
        if (response.status !== STATUS.CONNECTED) {
          return login();
        }
        return logout().pipe(
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
          picture = new Picture({
            id: null,
            url: data.url,
            width: data.width,
            height: data.height,
            silhouette: data.is_silhouette,
          } as PictureInterface);
        }

        return from<User>(
          axios.post(
            API_SERVER + '/users',
            new User({
              email,
              name,
              picture,
              id: null,
            }),
            {
              headers: { 'Access-Token': window.FB.getAccessToken() },
            },
          ),
        );
      },
    ),
  );
}
