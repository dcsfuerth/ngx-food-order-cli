import { ActionReducer } from '@ngrx/store';
import stringify from 'json-stable-stringify';

export function immutableDevMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state: any, action: any) {
    const prevStateSerialized = stringify(state);
    const newState = reducer(state, action);

    if (state === newState) {
      const newStateSerialized = stringify(newState);

      if (prevStateSerialized !== newStateSerialized) {
        throw new TypeError(
          `immutableDevMetaReducer: Deep state change without returning new state detected for action
          "${action.type}"!
          Never mutate the state!`
        );
      }
    }

    return newState;
  };
}
