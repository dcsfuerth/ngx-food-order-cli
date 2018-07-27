import { ApiRequest } from '@dcs/ngx-tools';
import { simpleUsersManager } from './simple-users.manager';

export class FetchSimpleUsers extends ApiRequest {
  constructor() {
    super({ url: 'users', method: 'GET' }, simpleUsersManager.actions.base);
  }
}
