import { ApiRequest, generateAsyncActionNames } from '@dcs/ngx-tools';

export const actions = generateAsyncActionNames('[Simple User] Fetch');

export class FetchSimpleUser extends ApiRequest {
  constructor() {
    super({ url: 'users/2', method: 'GET' }, actions.base);
  }
}
