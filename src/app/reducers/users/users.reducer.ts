import { ActionReducer, combineReducers } from '@ngrx/store';
import { currentUser, ICurrentUserState } from './current-user/current-user.reducer';
import { IUsersListState, usersList } from './users-list/users-list.reducer';

export interface State {
  currentUser: ICurrentUserState;
  usersList: IUsersListState;
}

export const reducer: ActionReducer<State> = combineReducers({ currentUser, usersList });
