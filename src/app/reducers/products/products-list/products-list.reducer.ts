import { Action } from '@ngrx/store';
import { fetchActions } from './products-list.actions';
import { IProduct } from '../models/product.class';
import {
  createActions,
  deleteActions,
  updateActions,
} from '../current-product/current-product.actions';

import {
  INormalizedCollectionState,
  generateNormalizedState,
  normalizedCollectionReducerFactory,
} from '@dcs/ngx-tools';

export interface IProductsListState extends INormalizedCollectionState {
  entities: { products: { [key: string]: IProduct } };
}

export const initialState: IProductsListState = Object.freeze({
  ...generateNormalizedState(),
  result: [] as string[],
  entities: { products: {} },
});

export const normalizedReducer = normalizedCollectionReducerFactory<IProductsListState>(
  'products',
  initialState,
  fetchActions,
  createActions,
  updateActions,
  deleteActions
);

export const productsList = (
  state: IProductsListState = initialState,
  action: Action
): IProductsListState => {
  switch (
    action.type
    // add custom or overwrite action handlers here
  ) {
  }

  return normalizedReducer(state, action);
};
