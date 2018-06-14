import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { orderSchema } from './current-order.schema';
import { Order } from '../models/order.class';
import {
  ApiGetRequest,
  generateAsyncActionNames,
  ApiDeleteRequest,
  ApiPostRequest,
  ApiPutRequest,
} from '@dcs/ngx-tools';

export enum CurrentOrderActionTypes {
  Fetch = '[Current Order] Fetch',
  Create = '[Current Order] Create',
  Update = '[Current Order] Update',
  Delete = '[Current Order] Delete',
}

export const fetchActions = generateAsyncActionNames(CurrentOrderActionTypes.Fetch);
export const createActions = generateAsyncActionNames(CurrentOrderActionTypes.Create);
export const updateActions = generateAsyncActionNames(CurrentOrderActionTypes.Update);
export const deleteActions = generateAsyncActionNames(CurrentOrderActionTypes.Delete);

export class FetchCurrentOrder extends ApiGetRequest {
  constructor(id: string) {
    super(`orders/${id}`, fetchActions.base, orderSchema);
  }
}

export class CreateCurrentOrder extends ApiPostRequest {
  constructor() {
    super(`orders`, createActions.base, new Order().toObject(), orderSchema);
  }
}

export class UpdateCurrentOrder extends ApiPutRequest {
  constructor(order: Order, cancel?: Observable<any>) {
    super(`orders/${order.id}`, updateActions.base, order.toObject(), orderSchema, cancel);
  }
}

export class DeleteCurrentOrder extends ApiDeleteRequest {
  constructor(order: Order) {
    super(`orders/${order.id}`, deleteActions.base, order.toObject());
  }
}

export class ResetCurrentOrder implements Action {
  readonly type = fetchActions.reset;
}
