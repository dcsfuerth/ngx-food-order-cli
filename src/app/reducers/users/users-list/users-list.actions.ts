import { ApiGetRequest, generateAsyncActionNames } from '@dcs/ngx-tools';
import { usersSchema } from './users-list.schema';

export enum UsersListActionTypes {
  Fetch = '[Users List] Fetch',
}

export const fetchActions = generateAsyncActionNames(UsersListActionTypes.Fetch);

export class FetchUsersList extends ApiGetRequest {
  constructor() {
    super('users', UsersListActionTypes.Fetch, usersSchema);
  }
}
