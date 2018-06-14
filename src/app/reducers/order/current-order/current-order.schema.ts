import { schema } from 'normalizr';
import { productSchema } from './../../products/current-product/current-product.schema';
import { userSchema } from './../../users/current-user/current-user.schema';

export const itemSchema = new schema.Entity(
  'items',
  {
    product: productSchema,
    user: userSchema,
  },
  {
    idAttribute(entity, parent) {
      return `${parent.id}_${entity.productId}_${entity.userId}`;
    },
    processStrategy(value) {
      return { ...value, product: value.productId, user: value.userId };
    },
  }
);

export const itemsSchema = new schema.Array(itemSchema);

export const orderSchema = new schema.Entity(
  'orders',
  { items: itemsSchema },
  {
    idAttribute(entity) {
      return String(entity.id);
    },
  }
);
