import { Action, ActionReducer } from '@ngrx/store';
import { ResetActionTypes } from './reset.actions';

export function resetReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state: any, action: Action) => {
    if (action.type === ResetActionTypes.Reset) {
      state = undefined;
    }
    return reducer(state, action);
  };
}
