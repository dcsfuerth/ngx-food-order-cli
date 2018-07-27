import { IAction, ISimpleEntityState } from '@dcs/ngx-tools';
import { IUser } from './simple-user.class';
import { simpleUserManager } from './simple-user.manager';

export type ISimpleUserState = ISimpleEntityState<IUser>;

export const reducer = (state: ISimpleUserState, action: IAction): ISimpleUserState => {
  switch (action.type) {
  }
  return simpleUserManager.reducer(state, action);
};
