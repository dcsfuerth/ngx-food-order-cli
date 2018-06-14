import { ActionReducer } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return storeLogger({
    collapsed: true,
    filter: { blacklist: [] },
  })(reducer);
}
