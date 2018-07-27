import { ApiRequest } from '@dcs/ngx-tools';
import { simpleUserManager } from './simple-user.manager';

export class FetchSimpleUser extends ApiRequest {
  constructor() {
    super({ url: 'users/2', method: 'GET' }, simpleUserManager.actions.base);
  }
}
