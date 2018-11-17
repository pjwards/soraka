import { Observable, AsyncSubject } from 'rxjs';
import {
  AxiosError,
  AxiosPromise,
  AxiosResponse,
} from 'axios';

export function from<T>(promise: AxiosPromise<T>): Observable<T> {
  const subject: AsyncSubject<T> = new AsyncSubject();
  promise
    .then((response: AxiosResponse<T>) => {
      subject.next(response.data);
      subject.complete();
    })
    .catch((err: AxiosError) => {
      subject.error(err.response && err.response.data);
      subject.complete();
    });
  return subject;
}

export function fromRaw<T>(promise: AxiosPromise<T>): Observable<AxiosResponse<T>> {
  const subject: AsyncSubject<AxiosResponse<T>> = new AsyncSubject();
  promise
    .then((response: AxiosResponse<T>) => {
      subject.next(response);
      subject.complete();
    })
    .catch((err: AxiosError) => {
      subject.error(err);
      subject.complete();
    });
  return subject;
}
