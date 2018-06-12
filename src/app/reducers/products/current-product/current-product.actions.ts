import { generateAsyncActionNames } from '@dcs/ngx-tools';

export enum CurrentProductActionTypes {
  Fetch = '[Current Product] Fetch',
  Create = '[Current Product] Create',
  Update = '[Current Product] Update',
  Delete = '[Current Product] Delete',
}

export const fetchActions = generateAsyncActionNames(CurrentProductActionTypes.Fetch);
export const createActions = generateAsyncActionNames(CurrentProductActionTypes.Create);
export const updateActions = generateAsyncActionNames(CurrentProductActionTypes.Update);
export const deleteActions = generateAsyncActionNames(CurrentProductActionTypes.Delete);
