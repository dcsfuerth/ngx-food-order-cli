import { Action } from '@ngrx/store';
import { userSchema } from './current-user.schema';
import { User } from '../models/user.class';
import {
  ApiGetRequest,
  generateAsyncActionNames,
  ApiDeleteRequest,
  ApiPostRequest,
  ApiPutRequest,
} from '@dcs/ngx-tools';

export enum CurrentUserActionTypes {
  Fetch = '[Current User] Fetch',
  Create = '[Current User] Create',
  Update = '[Current User] Update',
  Delete = '[Current User] Delete',
}

export const fetchActions = generateAsyncActionNames(CurrentUserActionTypes.Fetch);
export const createActions = generateAsyncActionNames(CurrentUserActionTypes.Create);
export const updateActions = generateAsyncActionNames(CurrentUserActionTypes.Update);
export const deleteActions = generateAsyncActionNames(CurrentUserActionTypes.Delete);

export class FetchCurrentUser extends ApiGetRequest {
  constructor(id: string) {
    super(`users/${id}`, fetchActions.base, userSchema);
  }
}

export class CreateCurrentUser extends ApiPostRequest {
  constructor(user: User) {
    super(`users`, createActions.base, user.toObject(), userSchema);
  }
}

export class UpdateCurrentUser extends ApiPutRequest {
  constructor(user: User) {
    super(`users/${user.id}`, updateActions.base, user.toObject(), userSchema);
  }
}

export class DeleteCurrentUser extends ApiDeleteRequest {
  constructor(user: User) {
    super(`users/${user.id}`, deleteActions.base, user.toObject());
  }
}

export class ResetCurrentUser implements Action {
  readonly type = fetchActions.reset;
}
