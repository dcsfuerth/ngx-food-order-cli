import { Action } from '@ngrx/store';

export enum ResetActionTypes {
  Reset = '[NGX Utils] Reset App State',
}

export class Reset implements Action {
  readonly type = ResetActionTypes.Reset;
}
