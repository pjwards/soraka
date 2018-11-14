import {
  InitParams,
  StatusResponse,
  EVENT,
  STATUS,
  UserResponse,
} from '@/facebook.interfaces';
import {
  AsyncSubject, Subject, Observable,
} from 'rxjs';

export function init(options: InitParams): void {
  window.FB.init(options);
}

declare type Callback = () => void;

export function asyncInit(options: InitParams, cb: Callback): Callback {
  return () => {
    init(options);
    cb();
  };
}

export function loadSDK(): void {
  const id: string = 'facebook-jssdk';
  const fjs: HTMLScriptElement = document.getElementsByTagName('script')[0];

  if (document.getElementById(id)) {
    return;
  }

  if (!fjs || !fjs.parentNode) {
    return;
  }

  const js: HTMLScriptElement = document.createElement('script');
  js.id = id;
  js.src = 'https://connect.facebook.net/ko_KR/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
}

/**
 * connected: 사용자가 Facebook에 로그인한 상태이고 앱을 인증했습니다.
 * authorization_expired: 사용자가 이전에 앱에 로그인했지만
 *                        해당 사용자의 데이터에 액세스할 수 있는 개발자 권한이 만료되었습니다.
 * not_authorized: 사용자가 Facebook에 로그인한 상태이지만 앱을 인증하지 않았습니다.
 * unknown: 사용자가 Facebook에 로그인하거나 앱에서 명시적으로 로그아웃하지 않아
 *          Facebook에 연결하려고 시도하지 않으므로 앱을 인증했는지 알 수 없습니다.
 */
export function getLoginStatus(force?: boolean): Observable<StatusResponse> {
  const subject: Subject<StatusResponse> = new AsyncSubject();

  window.FB.getLoginStatus((response: StatusResponse): void => {
    subject.next(response);
    subject.complete();
  }, force);

  return subject;
}

export function login(): Observable<StatusResponse> {
  const subject: Subject<StatusResponse> = new AsyncSubject();

  getLoginStatus()
    .subscribe((loginStatus: StatusResponse): void => {
      if (loginStatus.status === STATUS.CONNECTED) {
        throw new Error('The user is already connected.');
      }

      window.FB.login((response: StatusResponse) => {
        subject.next(response);
        subject.complete();
      });
    });

  return subject;
}

export function logout(): Observable<StatusResponse> {
  const subject: Subject<StatusResponse> = new AsyncSubject();

  if (!window.FB.getAccessToken()) {
    throw new Error('The user is already logout.');
  }

  window.FB.logout((response: StatusResponse) => {
    subject.next(response);
    subject.complete();
  });

  return subject;
}

export function getUser(fields: string = 'id,name,email,picture'): Observable<UserResponse> {
  const subject: Subject<any> = new AsyncSubject();

  window.FB.api(`/me${fields ? `?fields=${fields}` : ''}`, (user: any) => {
    subject.next(user);
    subject.complete();
  });

  return subject;
}

/**
 * auth.login: 이 이벤트는 앱에서 처음으로 사용자를 인지할 때(즉, 아직 유효한 세션이 없는 경우 세션을 가져올 때) 실행됩니다.
 * auth.logout: 이 이벤트는 앱에서 더 이상 유효한 사용자가 없다는 것을 인지할 때
 *              (즉, 세션이 있지만 더 이상 현재 사용자를 확인할 수 없을 때) 실행됩니다.
 * auth.authResponseChange: 이 이벤트는 인증 관련 변경 사항이 로그인, 로그아웃, 세션 새로 고침 세션에 영향을 미치므로
 *                          모든 인증 관련 변경 사항에 대해 실행됩니다.
 *                          세션은 사용자가 앱을 사용하는 한 계속해서 새로 고쳐집니다.
 * auth.statusChange: 일반적으로 auth.authResponseChange 이벤트를 사용하게 됩니다.
 *                    하지만 드물게 다음 세 가지 상태를 구별해야 하는 경우가 있습니다.
 *                    * 연결됨
 *                    * Facebook에 로그인했지만 앱에 연결되지 않음
 *                    * Facebook에 로그인하지 않음
 */
export function subscribe(event: EVENT, cb: (response?: StatusResponse) => void): void {
  window.FB.Event.subscribe(event, cb);
}
