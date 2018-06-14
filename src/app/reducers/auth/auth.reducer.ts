import { IAction } from '@dcs/ngx-tools';
import { AuthActionTypes, authenticateActions } from './auth.actions';
import { IUser } from '../users/models/user.class';

export interface State {
  entity: IUser | null | boolean;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: State = {
  entity: null,
  loading: false,
  loaded: false,
  error: null,
};

export function reducer(state: State = initialState, action: IAction): State {
  switch (action.type) {
    case authenticateActions.start:
      return { ...state, loading: true };

    case authenticateActions.success:
      return { ...initialState, loaded: true, entity: action.payload[0] };

    case authenticateActions.error:
      return { ...initialState, error: action.payload };

    // case REHYDRATE:
    //   const payload = action.payload || {};
    //   return { ...state, entity: false, ...payload.auth, loaded: true };

    case AuthActionTypes.Logout:
      return initialState;
  }

  return state;
}
