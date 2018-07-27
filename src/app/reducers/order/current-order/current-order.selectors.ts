import { normalizedEntitySelectorFactory } from '@dcs/ngx-tools';
import { createSelector } from '@ngrx/store';
import { productsListStateSelector } from '../../products/products-list/products-list.selectors';
import { IOrder, Order } from '../models/order.class';
import { ICurrentOrderState } from './current-order.reducer';
import { orderSchema } from './current-order.schema';
import { State } from '../..';
import { usersListManager } from '../../users/users-list/users-list.mananger';
import { getJoinedOrderState } from '../orders-list/orders-list.selectors';

export const pureCurrentOrderStateSelector = (state: State): ICurrentOrderState =>
  state.order.currentOrder;

export const currentOrderStateSelector = createSelector(
  [
    pureCurrentOrderStateSelector,
    productsListStateSelector,
    usersListManager.selectors.subState as any,
  ],
  getJoinedOrderState
);

export const currentOrderSelectors = normalizedEntitySelectorFactory<
  ICurrentOrderState,
  IOrder,
  Order
>(currentOrderStateSelector, orderSchema, Order);
