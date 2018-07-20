import { normalizedEntitySelectorFactory } from '@dcs/ngx-tools';
import { ICurrentProductState } from './current-product.reducer';
import { productSchema } from './current-product.schema';
import { State } from '../../index';
import { IProduct, Product } from '../models/product.class';

export const currentProductStateSelector = (state: State): ICurrentProductState =>
  state.products.currentProduct;

export const currentProductSelectors = normalizedEntitySelectorFactory<
  ICurrentProductState,
  IProduct,
  Product
>(currentProductStateSelector, productSchema, Product);
