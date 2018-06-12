import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Schema } from 'normalizr';
import { Observable } from 'rxjs';

export type IRequestMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface IApiActionRequest {
  method: IRequestMethods;
  url: string;
  options?: { [key: string]: any };
}

export interface IApiActionHandlers {
  start: (data: any) => Action;
  success: (data: any) => Action;
  error: (error: HttpErrorResponse) => Action;
  complete: () => Action;
}

export interface IApiActionPayload {
  request: IApiActionRequest;
  handlers: IApiActionHandlers | string;
  cancel?: Observable<any>;
  normalizrSchema?: Schema;
  rawDataProcessor?: (data: any) => any;
}

export interface IApiAction extends Action {
  payload: IApiActionPayload;
  meta?: object;
}
