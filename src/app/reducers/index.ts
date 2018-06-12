import { apiError, IApiErrorState } from '@dcs/ngx-tools';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import { storeLogger } from 'ngrx-store-logger';
import * as fromHome from './home/home.reducer';
import * as fromProducts from './products/products.reducer';
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
  apiError: IApiErrorState;
  home: fromHome.State;
  products: fromProducts.State;
}

export function hmrStateSetter(reducer: ActionReducer<State>): ActionReducer<State> {
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
  apiError,
  home: fromHome.reducer,
  products: fromProducts.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze, logger, hmrStateSetter]
  : [];
