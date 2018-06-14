import { Action } from '@ngrx/store';
import { productSchema } from './current-product.schema';
import { Product } from '../models/product.class';
import {
  ApiGetRequest,
  generateAsyncActionNames,
  ApiDeleteRequest,
  ApiPostRequest,
  ApiPutRequest,
} from '@dcs/ngx-tools';

export enum CurrentProductActionTypes {
  Fetch = '[Current Product] Fetch',
  Create = '[Current Product] Create',
  Update = '[Current Product] Update',
  Delete = '[Current Product] Delete',
}

export const fetchActions = generateAsyncActionNames(CurrentProductActionTypes.Fetch);
export const createActions = generateAsyncActionNames(CurrentProductActionTypes.Create);
export const updateActions = generateAsyncActionNames(CurrentProductActionTypes.Update);
export const deleteActions = generateAsyncActionNames(CurrentProductActionTypes.Delete);

export class FetchCurrentProduct extends ApiGetRequest {
  constructor(id: string) {
    super(`products/${id}`, fetchActions.base, productSchema);
  }
}

export class CreateCurrentProduct extends ApiPostRequest {
  constructor(product: Product) {
    super(`products`, createActions.base, product.toObject(), productSchema);
  }
}

export class UpdateCurrentProduct extends ApiPutRequest {
  constructor(product: Product) {
    super(`products/${product.id}`, updateActions.base, product.toObject(), productSchema);
  }
}

export class DeleteCurrentProduct extends ApiDeleteRequest {
  constructor(product: Product) {
    super(`products/${product.id}`, deleteActions.base, product.toObject());
  }
}

export class ResetCurrentProduct implements Action {
  readonly type = fetchActions.reset;
}
