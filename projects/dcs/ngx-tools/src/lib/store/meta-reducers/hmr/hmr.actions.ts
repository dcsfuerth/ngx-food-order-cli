import { Action } from '@ngrx/store';

export enum HmrActionTypes {
  SetRootState = '[HMR] Set Root State',
}

export class SetRootState implements Action {
  readonly type = HmrActionTypes.SetRootState;

  constructor(public payload: any) {}
}
