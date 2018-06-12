import { schema } from 'normalizr';
import { productSchema } from '../current-product/current-product.schema';

export const productsSchema = new schema.Array(productSchema);
