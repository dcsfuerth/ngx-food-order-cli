import { Action } from '@ngrx/store';
import { Reset } from './reset.actions';
import { resetReducer } from './reset.reducer';

const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

const rootReducer = resetReducer(
  (state: number = 4, action: Action): number => {
    switch (action.type) {
      case INCREASE:
        return state + 1;
      case DECREASE:
        return state - 1;
    }
    return state;
  }
);

describe('resetReducer', () => {
  it('resets the state to initialState when called with reset action', () => {
    const state = 42;
    expect(rootReducer(state, { type: INCREASE })).toEqual(43);
    expect(rootReducer(state, new Reset())).toEqual(4);
  });
});
