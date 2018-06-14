import { schema } from 'normalizr';

import { userSchema } from '../current-user/current-user.schema';

export const usersSchema = new schema.Array(userSchema);
