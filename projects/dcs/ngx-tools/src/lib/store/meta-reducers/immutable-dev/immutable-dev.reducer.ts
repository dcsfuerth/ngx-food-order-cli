import { ActionReducer } from '@ngrx/store';
import stringify from 'fast-safe-stringify';

export function immutableDevMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state: any, action: any) {
    const prevStateSerialized = stringify.stable(state);
    const newState = reducer(state, action);

    if (state === newState) {
      const before = performance.now();
      const newStateSerialized = stringify.stable(newState);
      console.log('cost', performance.now() - before);

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
