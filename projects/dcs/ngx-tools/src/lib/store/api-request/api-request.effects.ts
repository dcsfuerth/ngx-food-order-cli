import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { normalize } from 'normalizr';
import { CurriedFunction2, curry } from 'ramda';
import { concat, NEVER, of } from 'rxjs';
import { catchError, map, mergeMap, takeUntil } from 'rxjs/operators';
import { ApiError, ApiRequestActionTypes } from './api-request.actions';
import { IApiAction, IApiActionHandlers } from './interfaces';
import { IEnvironment } from '../../interfaces';
import { APP_ENVIRONMENT } from '../../tokens';
import { generateAsyncActionNames } from '../utils/actions';

export { CurriedFunction2, Action };

export function getHandlers(
  handlers: IApiActionHandlers | string,
  meta?: object
): IApiActionHandlers {
  if (typeof handlers === 'string') {
    const actions = generateAsyncActionNames(handlers);

    return {
      start(data) {
        return { type: actions.start, payload: data, meta: { ...meta } };
      },
      success(data) {
        return { type: actions.success, payload: data, meta: { ...meta, updatedAt: new Date() } };
      },
      error(error) {
        return { type: actions.error, payload: error, error: true, meta: { ...meta } };
      },
      complete() {
        return { type: actions.complete, meta: { ...meta } };
      },
    };
  } else {
    return handlers;
  }
}

export function getUrl(urlPath: string, environment: IEnvironment) {
  const urlRegex = /^(http(s)?|\/\/)/;

  if (urlPath.match(urlRegex)) {
    return urlPath;
  } else {
    return `${environment.apiUrl.replace(/\/$/, '')}/${urlPath.replace(/^\//, '')}`;
  }
}

export function defaultDataProcessor(data: any) {
  return data;
}

export function getRequestPayload(action: IApiAction): any {
  let requestPayload = action.payload.request.options ? action.payload.request.options.body : null;

  if (requestPayload && action.payload.normalizrSchema) {
    requestPayload = normalize(requestPayload, action.payload.normalizrSchema);
  }
  return requestPayload;
}

export const normalizeData = curry(
  (action: IApiAction, data: any): any => {
    if (action.payload.normalizrSchema) {
      return normalize(data, action.payload.normalizrSchema);
    }
    return data;
  }
);

@Injectable()
export class ApiRequestEffects {
  @Effect()
  apiRequest$ = this.actions$.pipe(
    ofType(ApiRequestActionTypes.ExecuteApiRequest),
    mergeMap((action: IApiAction) => {
      const handlers: IApiActionHandlers = getHandlers(action.payload.handlers, action.meta);
      const request = action.payload.request;

      return concat(
        of(handlers.start(getRequestPayload(action))),
        this.http
          .request(request.method, getUrl(request.url, this.environment), request.options)
          .pipe(
            takeUntil(action.payload.cancel || NEVER),
            map(action.payload.rawDataProcessor || defaultDataProcessor),
            map(normalizeData(action)),
            map(handlers.success),
            catchError(error => of(handlers.error(error), new ApiError({ error, action })))
          ),
        of(handlers.complete())
      );
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    @Inject(APP_ENVIRONMENT) private environment: IEnvironment
  ) {}
}
