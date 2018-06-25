import { ApiDeleteRequest, ApiGetRequest, ApiPostRequest, ApiPutRequest } from '@dcs/ngx-tools';
import { Action } from '@ngrx/store';
import { currentUserManager } from './current-user.manager';
import { User } from '../models/user.class';

export class FetchCurrentUser extends ApiGetRequest {
  constructor(id: string) {
    super(`users/${id}`, currentUserManager.actions.fetch.base, currentUserManager.schema);
  }
}

export class CreateCurrentUser extends ApiPostRequest {
  constructor(user: User) {
    super(
      `users`,
      currentUserManager.actions.create.base,
      user.toObject(),
      currentUserManager.schema
    );
  }
}

export class UpdateCurrentUser extends ApiPutRequest {
  constructor(user: User) {
    super(
      `users/${user.id}`,
      currentUserManager.actions.update.base,
      user.toObject(),
      currentUserManager.schema
    );
  }
}

export class DeleteCurrentUser extends ApiDeleteRequest {
  constructor(user: User) {
    super(`users/${user.id}`, currentUserManager.actions.delete.base, user.toObject());
  }
}

export class ResetCurrentUser implements Action {
  readonly type = currentUserManager.actions.fetch.reset;
}
