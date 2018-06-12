import { ApiGetRequest, generateAsyncActionNames } from '@dcs/ngx-tools';
import { productsSchema } from './products-list.schema';

export enum ProductsListActionTypes {
  Fetch = '[Products List] Fetch',
}

export const fetchActions = generateAsyncActionNames(ProductsListActionTypes.Fetch);

export class FetchProductsList extends ApiGetRequest {
  constructor() {
    super('products', ProductsListActionTypes.Fetch, productsSchema);
  }
}
