import { ActionReducer } from '@ngrx/store';
import { HmrActionTypes } from './hmr.actions';

export function hmrStateSetter(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state: any, action: any) {
    if (action.type === HmrActionTypes.SetRootState) {
      return action.payload;
    }
    return reducer(state, action);
  };
}
