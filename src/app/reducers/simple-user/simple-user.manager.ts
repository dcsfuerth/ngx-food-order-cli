import { State } from '..';
import { createSimpleEntityManager } from '@dcs/ngx-tools';
import { IUser, User } from './simple-user.class';

export const simpleUserStateSelector = (state: State) => state.simpleUser;

export const simpleUserManager = createSimpleEntityManager<State, IUser, User>(
  '[Simple User] Fetch',
  simpleUserStateSelector,
  User
);
