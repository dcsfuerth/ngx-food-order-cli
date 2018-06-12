import { schema } from 'normalizr';

export const productSchema = new schema.Entity(
  'products',
  {},
  {
    idAttribute(entity) {
      return String(entity.id);
    },
  }
);
