import { createSimpleEntityReducer, ISimpleEntityState } from '@dcs/ngx-tools';
import { actions } from './simple-user.actions';
import { IUser } from './simple-user.class';

export type ISimpleUserState = ISimpleEntityState<IUser>;

export const reducer = createSimpleEntityReducer<IUser>(actions);
