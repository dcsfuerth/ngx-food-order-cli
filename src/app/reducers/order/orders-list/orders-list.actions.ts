import { ApiGetRequest, generateAsyncActionNames } from '@dcs/ngx-tools';
import { schema } from 'normalizr';
import { orderSchema } from '../current-order/current-order.schema';

export enum OrdersListActionTypes {
  Fetch = '[Orders List] Fetch',
}
export const fetchActions = generateAsyncActionNames(OrdersListActionTypes.Fetch);

export const ordersSchema = new schema.Array(orderSchema);

export class FetchOrdersList extends ApiGetRequest {
  constructor() {
    super('orders', OrdersListActionTypes.Fetch, ordersSchema);
  }
}
