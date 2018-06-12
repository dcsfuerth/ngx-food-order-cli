import { ActionReducer, combineReducers } from '@ngrx/store';
import { IProductsListState, productsList } from './products-list/products-list.reducer';

export interface State {
  productsList: IProductsListState;
}

export const reducer: ActionReducer<State> = combineReducers({
  productsList,
});
