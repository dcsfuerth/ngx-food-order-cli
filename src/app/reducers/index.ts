import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { storeLogger } from 'ngrx-store-logger';
import * as fromHome from './home/home.reducer';
import { environment } from '../../environments/environment';

import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';

export interface State {
  router: RouterReducerState;
  home: fromHome.State;
}

export function stateSetter(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: any, action: any) {
    if (action.type === 'SET_ROOT_STATE') {
      return action.payload;
    }
    return reducer(state, action);
  };
}

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return storeLogger({
    collapsed: true,
    filter: { blacklist: [] },
  })(reducer);
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  home: fromHome.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger, stateSetter]
  : [];
