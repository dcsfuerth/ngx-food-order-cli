import { ApiGetRequest, generateAsyncActionNames } from '@dcs/ngx-tools';
import { usersListManager } from './users-list.mananger';

export class FetchUsersList extends ApiGetRequest {
  constructor() {
    super('users', usersListManager.actions.fetch.base, usersListManager.schema);
  }
}
