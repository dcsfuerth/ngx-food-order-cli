import { schema } from 'normalizr';
import { State } from '../..';
import { currentUserManager } from '../current-user/current-user.manager';
import { IUser, User } from '../models/user.class';
import {
  crudCollectionManagerFactory,
  generateNormalizedState,
  INormalizedCollectionState,
  generateNormalizedCollectionState,
} from '@dcs/ngx-tools';

export interface IUsersListState extends INormalizedCollectionState {
  entities: { users: { [key: string]: IUser } };
}

const initialState = generateNormalizedCollectionState<IUsersListState>({ users: {} });

const usersSchema = new schema.Array(currentUserManager.schema);

const usersListStateSelector = (state: State): IUsersListState => state.users.usersList;

export const usersListManager = crudCollectionManagerFactory(
  'Users List',
  'users',
  initialState,
  currentUserManager.actions,
  usersListStateSelector,
  usersSchema,
  User
);
