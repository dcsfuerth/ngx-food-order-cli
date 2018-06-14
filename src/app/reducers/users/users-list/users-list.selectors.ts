import { normalizedCollectionSelectorFactory } from '@dcs/ngx-tools';
import { IUsersListState } from './users-list.reducer';
import { usersSchema } from './users-list.schema';
import { State } from '../..';
import { IUser, User } from '../models/user.class';

export const usersListStateSelector = (state: State): IUsersListState => state.users.usersList;

export const usersListSelectors = normalizedCollectionSelectorFactory<State, IUser, User>(
  usersListStateSelector,
  usersSchema,
  User
);
