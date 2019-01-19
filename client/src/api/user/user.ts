import {
  Observable,
} from 'rxjs';
import axios from 'axios';
import {
  from,
} from '@/utils/http';
import { API_SERVER } from '@/settings';
import { SignUpForm } from '@/types/domain/inteface/auth';
import { UserInterface } from '@/types/domain/inteface/user';

export function currentUser() {
  return from<any>(
    axios.get(
      API_SERVER + '/account',
    ),
  );
}

export function signUpLocal(form: SignUpForm): Observable<any> {
  return from<any>(
    axios.post(
      API_SERVER + '/signup',
      form,
    ),
  );
}

export function logInLocal(form: SignUpForm): Observable<UserInterface> {
  return from<any>(
    axios.post(
      API_SERVER + '/login',
      form,
    ),
  );
}

export function logInGoogle(): void {
  window.location.href = API_SERVER + '/oauth/google';
}

export function logOut(): Observable<any> {
  return from<any>(
    axios.get(
      API_SERVER + '/logout',
    ),
  );
}
