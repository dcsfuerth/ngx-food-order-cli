import { State } from '..';
import { State as AuthState } from './auth.reducer';

export const subStateSelector = (state: State): AuthState => state.auth;

export const tokenSelector = (state: State) => subStateSelector(state).entity;

export const isLoggedInSelector = (state: State): boolean =>
  !!subStateSelector(state).entity.accessToken;

export const loadedSelector = (state: State): boolean => subStateSelector(state).loaded;

export const authFailedSelector = (state: State): boolean => {
  const subState = subStateSelector(state);
  return !!subState.error;
};
