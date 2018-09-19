import { HttpErrorResponse } from '@angular/common/http';
import { IAction, ResetActionTypes } from '@dcs/ngx-tools';
import { AuthActionTypes, authenticateActions } from './auth.actions';
import { AccessToken } from '../../auth/login/types';

export interface State {
  entity: AccessToken;
  loading: boolean;
  loaded: boolean;
  error: HttpErrorResponse | null;
}

export const initialState: State = {
  entity: { accessToken: '' },
  loading: false,
  loaded: false,
  error: null,
};

export function reducer(state: State = initialState, action: IAction): State {
  switch (action.type) {
    case authenticateActions.start:
      return { ...state, loading: true };

    case authenticateActions.success:
      return { ...initialState, loaded: true, entity: action.payload };

    case authenticateActions.error:
      return { ...initialState, error: action.payload };

    case ResetActionTypes.Reset:
      return initialState;

    case AuthActionTypes.Logout:
      return initialState;
  }

  return state;
}
