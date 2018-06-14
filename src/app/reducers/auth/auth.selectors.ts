import { State } from '..';
import { IUser } from './../users/models/user.class';
import { State as AuthState } from './auth.reducer';

export const subStateSelector = (state: State): AuthState => state.auth;

export const loggedInUserSelector = (state: State): IUser =>
  subStateSelector(state).entity as IUser;

export const isLoggedInSelector = (state: State): boolean => !!subStateSelector(state).entity;

export const loadedSelector = (state: State): boolean => subStateSelector(state).loaded;

export const authFailedSelector = (state: State): boolean => {
  const subState = subStateSelector(state);
  return subState.entity === undefined && subState.loaded === true;
};
