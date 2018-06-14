import { ApiGetRequest, generateAsyncActionNames } from '@dcs/ngx-tools';
import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  Authenticate = '[Auth] Authenticate',
  LoginSuccess = '[Auth] Login Success',
  Logout = '[Auth] Logout',
}

export const authenticateActions = generateAsyncActionNames(AuthActionTypes.Authenticate);

export class Authenticate extends ApiGetRequest {
  constructor(email: string) {
    super(`users?email=${email}`, AuthActionTypes.Authenticate);
  }
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}
