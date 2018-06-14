import { apiError, hmrStateSetter, IApiErrorState, logger, resetReducer } from '@dcs/ngx-tools';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';
import { localStorageSync } from 'ngrx-store-localstorage';
import * as fromAuth from './auth/auth.reducer';
import * as fromHome from './home/home.reducer';
import * as fromProducts from './products/products.reducer';
import * as fromUsers from './users/users.reducer';
import { environment } from '../../environments/environment';

import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  Action,
} from '@ngrx/store';

export interface State {
  router: RouterReducerState;
  apiError: IApiErrorState;
  auth: fromAuth.State;
  home: fromHome.State;
  products: fromProducts.State;
  users: fromUsers.State;
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['auth'], rehydrate: true })(reducer);
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
  apiError,
  auth: fromAuth.reducer,
  home: fromHome.reducer,
  products: fromProducts.reducer,
  users: fromUsers.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze, logger, resetReducer, hmrStateSetter, localStorageSyncReducer]
  : [resetReducer, localStorageSyncReducer];
