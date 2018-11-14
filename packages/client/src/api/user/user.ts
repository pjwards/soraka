import {
  EMPTY,
  Observable,
  of,
} from 'rxjs';
import {
  catchError,
  switchMap,
} from 'rxjs/operators';
import axios from 'axios';

import { User } from '@/models/user';
import { from } from '@/utils/http';
import * as fb from '@/api/facebook';
import { getLoginStatus } from '@/api/facebook';
import {
  STATUS,
  StatusResponse,
  UserResponse,
} from '@/facebook.interfaces';
import { API_SERVER } from '@/settings';
import { Picture } from '@/models/picture';
import { PictureInterface } from '@/shared/domain/inteface';
import { Role } from '@/shared/domain/enum';

export function signUp(): Observable<User> {
  return fb.getLoginStatus().pipe(
    switchMap(
      (response: StatusResponse): Observable<StatusResponse> => {
        if (response.status !== STATUS.CONNECTED) {
          return fb.login();
        }
        return fb.logout().pipe(
          switchMap(
            (): Observable<StatusResponse> => {
              return fb.login();
            },
          ),
        );
      },
    ),
    switchMap(
      (response: StatusResponse): Observable<UserResponse> => {
        if (response.status !== STATUS.CONNECTED) {
          throw Error('Can not connected.');
        }
        return fb.getUser();
      },
    ),
    switchMap(
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
              role: null,
            }),
            {
              headers: { 'Access-Token': window.FB.getAccessToken() },
            },
          ),
        );
      },
    ),
    catchError(() => {
      fb.logout();
      return EMPTY;
    }),
  );
}

export function login(): Observable<User> {
  return fb.getLoginStatus().pipe(
    switchMap(
      (response: StatusResponse): Observable<StatusResponse> => {
        if (response.status !== STATUS.CONNECTED) {
          return fb.login();
        }
        return fb.logout().pipe(
          switchMap(
            (): Observable<StatusResponse> => {
              return fb.login();
            },
          ),
        );
      },
    ),
    switchMap(
      (): Observable<User> => {
        return from<User>(
          axios.get(
            API_SERVER + '/login',
            {
              headers: { 'Access-Token': window.FB.getAccessToken() },
            },
          ),
        );
      },
    ),
    catchError(() => {
      fb.logout();
      return EMPTY;
    }),
  );
}

export function logout(): Observable<boolean> {
  return fb.logout()
    .pipe(
      switchMap((response: StatusResponse): Observable<boolean> => {
        if (response.status !== STATUS.UNKNOWN) {
          return of(false);
        }
        return of(true);
      }),
    );
}

export function currentUser(): Observable<User | null> {
  return getLoginStatus().pipe(
    switchMap(
      (response: StatusResponse): Observable<User | null> => {
        if (response.status !== STATUS.CONNECTED) {
          return of(null);
        }
        return from<User>(
          axios.get(
            API_SERVER + '/login',
            {
              headers: { 'Access-Token': window.FB.getAccessToken() },
            },
          ),
        ).pipe(
          catchError((): Observable<null> => {
            return fb.logout().pipe(
              switchMap(() => of(null)),
            );
          }),
        );
      },
    ),
  );
}
