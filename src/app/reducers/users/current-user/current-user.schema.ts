import { schema } from 'normalizr';

export const userSchema = new schema.Entity(
  'users',
  {},
  {
    idAttribute(entity) {
      return String(entity.id);
    },
  }
);
