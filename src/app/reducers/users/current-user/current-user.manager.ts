import { schema } from 'normalizr';
import { State } from '../..';
import { IUser, User } from '../models/user.class';
import {
  crudEntityManagerFactory,
  INormalizedEntityState,
  generateNormalizedEntityState,
} from '@dcs/ngx-tools';

export interface ICurrentUserState extends INormalizedEntityState {
  entities: { users: { [key: string]: IUser } };
}

const initialState = generateNormalizedEntityState<ICurrentUserState>({ users: {} });

const userSchema = new schema.Entity(
  'users',
  {},
  {
    idAttribute(entity) {
      return String(entity.id);
    },
  }
);

export const currentUserStateSelector = (state: State): ICurrentUserState =>
  state.users.currentUser;

export const currentUserManager = crudEntityManagerFactory(
  'Current User',
  initialState,
  currentUserStateSelector,
  userSchema,
  User
);
