import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import * as fromAuth from './auth/auth.reducer';
import * as fromHome from './home/home.reducer';
import { IJokesState, jokesManager } from './jokes/jokes.manager';
import * as fromOrder from './order/order.reducer';
import * as fromProducts from './products/products.reducer';
import { ISimpleUserState, reducer as simpleUserReducer } from './simple-user/simple-user.reducer';
import { ISimpleUsersState, simpleUsersManager } from './simple-users/simple-users.manager';
import * as fromUsers from './users/users.reducer';
import { environment } from '../../environments/environment';
import {
  apiError,
  hmrStateSetter,
  IApiErrorState,
  logger,
  resetReducer,
  immutableDevMetaReducer,
} from '@dcs/ngx-tools';

export interface State {
  router: RouterReducerState;
  apiError: IApiErrorState;
  auth: fromAuth.State;
  home: fromHome.State;
  products: fromProducts.State;
  users: fromUsers.State;
  order: fromOrder.State;
  jokes: IJokesState;
  simpleUser: ISimpleUserState;
  simpleUsers: ISimpleUsersState;
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['auth'], rehydrate: true })(reducer);
}

export const reducers: ActionReducerMap<State, any> = {
  router: routerReducer,
  apiError,
  auth: fromAuth.reducer,
  home: fromHome.reducer,
  products: fromProducts.reducer,
  users: fromUsers.reducer,
  order: fromOrder.reducer,
  jokes: jokesManager.reducer,
  simpleUser: simpleUserReducer,
  simpleUsers: simpleUsersManager.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [immutableDevMetaReducer, logger, resetReducer, hmrStateSetter, localStorageSyncReducer]
  : [resetReducer, localStorageSyncReducer];
