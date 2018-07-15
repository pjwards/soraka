import { Observable, AsyncSubject } from 'rxjs';
import { AxiosPromise, AxiosResponse } from 'axios';

export function from<T>(promise: AxiosPromise<T>): Observable<T> {
  const subject: AsyncSubject<T> = new AsyncSubject();
  promise
    .then((response: AxiosResponse<T>) => {
      subject.next(response.data);
      subject.complete();
    })
    .catch((err: AxiosResponse<T>) => {
      subject.error(err);
      subject.complete();
    });
  return subject;
}
