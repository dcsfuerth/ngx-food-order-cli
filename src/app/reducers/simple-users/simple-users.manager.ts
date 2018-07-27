import { State } from '..';
import { createSimpleCollectionManager, ISimpleCollectionState } from '@dcs/ngx-tools';
import { IUser, User } from '../simple-user/simple-user.class';

export type ISimpleUsersState = ISimpleCollectionState<IUser>;

export const simpleUsersStateSelector = (state: State) => state.simpleUsers;

export const simpleUsersManager = createSimpleCollectionManager<State, IUser, User>(
  '[Simple Users] Fetch',
  simpleUsersStateSelector,
  User
);
