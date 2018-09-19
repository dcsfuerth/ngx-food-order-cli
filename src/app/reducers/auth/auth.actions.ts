import { ApiGetRequest, ApiPostRequest, generateAsyncActionNames } from '@dcs/ngx-tools';
import { Action } from '@ngrx/store';
import { LoginData } from '../../auth/login/types';

export enum AuthActionTypes {
  Authenticate = '[Auth] Authenticate',
  LoginSuccess = '[Auth] Login Success',
  Logout = '[Auth] Logout',
}

export const authenticateActions = generateAsyncActionNames(AuthActionTypes.Authenticate);

export class Authenticate2 extends ApiGetRequest {
  constructor(data: LoginData) {
    super(`users?email=${data.email}`, AuthActionTypes.Authenticate);
  }
}

export class Authenticate extends ApiPostRequest {
  constructor(data: LoginData) {
    super('/auth/login', AuthActionTypes.Authenticate, data);
  }
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}
