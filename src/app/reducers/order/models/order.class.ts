import { ViewModel } from '@dcs/ngx-tools';
import { add, prop, reduce } from 'ramda';
import { IItem, Item } from './item.class';

export interface IOrder {
  id: string;
  completed: boolean;
  items: IItem[];
}

export const calculatePrice = reduce((sum, item: Item) => add(sum, prop('price', item)), 0);

export class Order extends ViewModel<IOrder> {
  protected static readonly defaults: IOrder = {
    id: '',
    completed: false,
    items: [],
  };

  public id: string;
  public completed: boolean;
  private _price: number;

  get price(): number {
    return this._price;
  }

  set price(val: number) {
    this._price = val;
  }

  get items(): Item[] {
    return this.getInstance('items', Item, true);
  }

  get numberOfItems(): number {
    return this.items.length;
  }

  constructor(params: Partial<IOrder> = {}) {
    super({ ...Order.defaults, ...params });
  }

  public init(): void {
    this.price = calculatePrice(this.items);
  }
}
