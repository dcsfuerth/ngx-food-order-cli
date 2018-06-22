import { ActionReducer, combineReducers } from '@ngrx/store';
import { ICurrentUserState } from './current-user/current-user.manager';
import { currentUser } from './current-user/current-user.reducer';
import { IUsersListState, usersListManager } from './users-list/users-list.mananger';

export interface State {
  currentUser: ICurrentUserState;
  usersList: IUsersListState;
}

export const reducer: ActionReducer<State> = combineReducers({
  currentUser,
  usersList: usersListManager.reducer,
});
