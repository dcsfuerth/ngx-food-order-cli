import { normalizedCollectionSelectorFactory } from '@dcs/ngx-tools';
import { createSelector } from '@ngrx/store';
import { IProductsListState } from './../../products/products-list/products-list.reducer';
import { productsListStateSelector } from './../../products/products-list/products-list.selectors';
import { IUsersListState } from './../../users/users-list/users-list.reducer';
import { usersListStateSelector } from './../../users/users-list/users-list.selectors';
import { IOrder, Order } from './../models/order.class';
import { ordersSchema } from './orders-list.actions';
import { IOrdersListState } from './orders-list.reducer';
import { State } from '../..';

export function getJoinedOrderState(
  ordersState: any,
  productsListState: IProductsListState,
  usersListState: IUsersListState
) {
  return {
    ...ordersState,
    loaded: ordersState.loaded && productsListState.loaded && usersListState.loaded,
    entities: {
      ...ordersState.entities,
      ...productsListState.entities,
      ...usersListState.entities,
    },
  };
}

export const pureOrdersListStateSelector = (state: State): IOrdersListState =>
  state.order.ordersList;

export const ordersListStateSelector = createSelector(
  [pureOrdersListStateSelector, productsListStateSelector, usersListStateSelector],
  getJoinedOrderState
);

export const ordersListSelectors = normalizedCollectionSelectorFactory<State, IOrder, Order>(
  ordersListStateSelector,
  ordersSchema,
  Order
);
