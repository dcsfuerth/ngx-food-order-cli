import { __, compose, CurriedFunction2, CurriedFunction3, curry } from 'ramda';
import { IAction, INormalizedEntityState, INormalizedState } from '../selectors/interfaces';
import { IAsyncActionNames } from '../utils/actions';
import {
  asyncFetchReducerFactory,
  generateNormalizedState,
} from './normalized-collection.reducers';

// ARGH Typescript
export { CurriedFunction2, CurriedFunction3 };

export function generateNormalizedEntityState<
  S extends INormalizedEntityState = INormalizedEntityState
>(entities: { [key in keyof S['entities']]: {} }): S {
  return Object.freeze({
    ...generateNormalizedState(),
    result: '',
    entities,
  }) as any;
}

export function asyncSaveEntityReducerFactory<S extends INormalizedState>(
  initialState: S,
  actionHandlers: IAsyncActionNames
) {
  return curry(
    (state: S, action: IAction): S => {
      switch (action.type) {
        case actionHandlers.start:
          if (state.lastState) {
            // prevent lastState in lastState in lastState ...
            state = Object.assign({}, state, { lastState: null });
          }
          return Object.assign({}, state, action.payload, {
            updating: true,
            lastState: state,
            error: null,
          });

        case actionHandlers.success:
          return Object.assign({}, initialState, action.payload, { loaded: true, lastState: null });

        case actionHandlers.error:
          return Object.assign({}, state.lastState as S, {
            error: action.payload,
            lastState: null,
          });
      }

      return state;
    }
  );
}

export function asyncRemoveEntityReducerFactory<S extends INormalizedState>(
  initialState: S,
  actionHandlers: IAsyncActionNames
) {
  return curry(
    (state: S, action: IAction): S => {
      switch (action.type) {
        case actionHandlers.start:
          return Object.assign({}, initialState, {
            updating: true,
            error: null,
            lastState: state,
          });

        case actionHandlers.success:
          return Object.assign({}, state, { updating: false, lastState: null });

        case actionHandlers.error:
          return Object.assign({}, state.lastState as S, {
            error: action.payload,
            lastState: null,
            updating: false,
          });
      }

      return state;
    }
  );
}

export function normalizedEntityReducerFactory<S extends INormalizedEntityState>(
  initialState: S,
  fetchActions: IAsyncActionNames,
  createActions: IAsyncActionNames,
  updateActions: IAsyncActionNames,
  deleteActions: IAsyncActionNames
) {
  const fetchReducer = asyncFetchReducerFactory(initialState, fetchActions);
  const createReducer = asyncSaveEntityReducerFactory(initialState, createActions);
  const updateReducer = asyncSaveEntityReducerFactory(initialState, updateActions);
  const deleteReducer = asyncRemoveEntityReducerFactory(initialState, deleteActions);

  return (state: S = initialState, action: IAction): S => {
    state = compose(
      deleteReducer(__, action),
      updateReducer(__, action),
      createReducer(__, action)
    )(state);
    // TODO: replace workaround - including fetchReducer in compose above throws stange error
    // Error: First argument to _arity must be a non-negative integer no greater than ten
    return fetchReducer(state, action);
  };
}
