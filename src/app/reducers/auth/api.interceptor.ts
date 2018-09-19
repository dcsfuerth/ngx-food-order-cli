import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_ENVIRONMENT, IEnvironment, Reset } from '@dcs/ngx-tools';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, flatMap, map, take } from 'rxjs/operators';
import { tokenSelector } from './auth.selectors';
import { State } from '../';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private store: Store<State>, @Inject(APP_ENVIRONMENT) private env: IEnvironment) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.pipe(
      take(1),
      map(state => tokenSelector(state)),
      flatMap(token => {
        if (request.url.startsWith(this.env.apiUrl)) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          });
        }
        return next.handle(request).pipe(
          catchError(e => {
            this.store.dispatch(new Reset());
            throw e;
          })
        );
      })
    );
  }
}
