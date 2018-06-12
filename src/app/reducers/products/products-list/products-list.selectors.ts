import { normalizedCollectionSelectorFactory } from '@dcs/ngx-tools';
import { IProductsListState } from './products-list.reducer';
import { productsSchema } from './products-list.schema';
import { State } from '../../index';
import { IProduct, Product } from '../models/product.class';

export const productsListStateSelector = (state: State): IProductsListState =>
  state.products.productsList;

export const productsListSelectors = normalizedCollectionSelectorFactory<State, IProduct, Product>(
  productsListStateSelector,
  productsSchema,
  Product
);
