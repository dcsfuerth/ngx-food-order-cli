import { ViewModel } from '@dcs/ngx-tools';
import { IProduct, Product } from '../../products/models/product.class';
import { IUser, User } from '../../users/models/user.class';

export interface IItem {
  productId: string;
  userId: string;
  numberOfProducts: number;
  product: IProduct | null;
  user: IUser | null;
}

export class Item extends ViewModel<IItem> {
  protected static readonly defaults: IItem = {
    productId: '',
    userId: '',
    numberOfProducts: 0,
    product: null,
    user: null,
  };

  public numberOfProducts: number;
  public productId: string;
  public userId: string;

  get user(): User {
    return this.getInstance('user', User);
  }

  get product(): Product {
    return this.getInstance('product', Product);
  }

  get price(): number {
    return this.product.price * this.numberOfProducts;
  }

  constructor(params: Partial<IItem> = {}) {
    super({ ...Item.defaults, ...params });
  }
}
