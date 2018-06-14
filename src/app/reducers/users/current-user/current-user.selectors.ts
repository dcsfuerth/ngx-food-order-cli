import { normalizedEntitySelectorFactory } from '@dcs/ngx-tools';
import { ICurrentUserState } from './current-user.reducer';
import { userSchema } from './current-user.schema';
import { State } from '../..';
import { IUser, User } from '../models/user.class';

export const currentUserStateSelector = (state: State): ICurrentUserState =>
  state.users.currentUser;

export const currentUserSelectors = normalizedEntitySelectorFactory<State, IUser, User>(
  currentUserStateSelector,
  userSchema,
  User
);
