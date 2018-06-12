import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Schema } from 'normalizr';
import { Observable } from 'rxjs';
import { IApiAction, IApiActionHandlers, IApiActionPayload, IApiActionRequest } from './interfaces';

export enum ApiRequestActionTypes {
  ExecuteApiRequest = '[ApiRequest] Execute API Request',
  ApiError = '[ApiRequest] Error',
  ApiErrorsReset = '[ApiRequest] Reset Errors',
}

export class ApiRequest implements IApiAction {
  readonly type = ApiRequestActionTypes.ExecuteApiRequest;
  public payload: IApiActionPayload;

  constructor(
    request: IApiActionRequest,
    handlers: IApiActionHandlers | string,
    normalizrSchema?: Schema,
    cancel?: Observable<any>,
    rawDataProcessor?: (data: any) => any
  ) {
    this.payload = {
      request,
      handlers,
      cancel,
      normalizrSchema,
      rawDataProcessor,
    };
  }
}

export class ApiGetRequest extends ApiRequest {
  readonly type = ApiRequestActionTypes.ExecuteApiRequest;
  public payload: IApiActionPayload;

  constructor(
    url: string,
    handlers: IApiActionHandlers | string,
    normalizrSchema?: Schema,
    cancel?: Observable<any>,
    rawDataProcessor?: (data: any) => any
  ) {
    super({ url, method: 'GET' }, handlers, normalizrSchema, cancel, rawDataProcessor);
  }
}

export class ApiError implements Action {
  readonly type = ApiRequestActionTypes.ApiError;

  constructor(public payload: { error: HttpErrorResponse; action: Action }) {}
}

export class ApiErrorsReset implements Action {
  readonly type = ApiRequestActionTypes.ApiErrorsReset;
}

export type ApiRequestActions = ApiRequest | ApiGetRequest;
export type ApiRequestErrorActions = ApiError | ApiErrorsReset;
