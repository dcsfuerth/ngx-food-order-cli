import { ActionReducer, combineReducers } from '@ngrx/store';
import { currentProduct, ICurrentProductState } from './current-product/current-product.reducer';
import { IProductsListState, productsList } from './products-list/products-list.reducer';

export interface State {
  productsList: IProductsListState;
  currentProduct: ICurrentProductState;
}

export const reducer: ActionReducer<State> = combineReducers({
  productsList,
  currentProduct,
});
