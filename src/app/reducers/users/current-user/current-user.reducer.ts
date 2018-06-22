import { Action } from '@ngrx/store';
import { currentUserManager, ICurrentUserState } from './current-user.manager';

export const currentUser = (
  state: ICurrentUserState = currentUserManager.initialState,
  action: Action
): ICurrentUserState => {
  switch (
    action.type
    // overwrite or add any actions here, just default redux
  ) {
  }

  return currentUserManager.reducer(state, action);
};
