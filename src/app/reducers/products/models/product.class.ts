import { ViewModel } from '@dcs/ngx-tools';

export interface IProduct {
  id: string;
  articleId: string;
  label: string;
  price: number;
}

export class Product extends ViewModel<IProduct> {
  protected static readonly defaults = {
    articleId: '',
    id: '',
    label: 'New Product',
    price: 0,
  };

  public id: string;
  public articleId: string;
  public label: string;
  public price: number;

  constructor(props: Partial<IProduct>) {
    props = props || Product.defaults;
    super(props);
  }
}
