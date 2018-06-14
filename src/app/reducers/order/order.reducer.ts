import { combineReducers } from '@ngrx/store';
import { currentOrder, ICurrentOrderState } from './current-order/current-order.reducer';
import { IOrdersListState, ordersList } from './orders-list/orders-list.reducer';

export interface State {
  ordersList: IOrdersListState;
  currentOrder: ICurrentOrderState;
}

export const reducer = combineReducers({ ordersList, currentOrder });
