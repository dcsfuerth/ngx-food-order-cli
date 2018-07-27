import { State } from '..';
import { simpleStateSelectorsFactory } from '@dcs/ngx-tools';
import { IUser, User } from './simple-user.class';

export const simpleUserStateSelector = (state: State) => state.simpleUser;

export const simpleUserSelectors = simpleStateSelectorsFactory<State, IUser, User>(
  simpleUserStateSelector,
  User
);
