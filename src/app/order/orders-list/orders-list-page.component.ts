import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StoreComponent } from '@dcs/ngx-tools';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Order } from './../../reducers/order/models/order.class';
import { FetchOrdersList } from './../../reducers/order/orders-list/orders-list.actions';
import { ordersListSelectors } from './../../reducers/order/orders-list/orders-list.selectors';
import { FetchProductsList } from './../../reducers/products/products-list/products-list.actions';
import { productsListSelectors } from './../../reducers/products/products-list/products-list.selectors';
import { FetchUsersList } from './../../reducers/users/users-list/users-list.actions';
import { State } from '../../reducers';
import { CreateCurrentOrder } from '../../reducers/order/current-order/current-order.actions';
import { usersListManager } from '../../reducers/users/users-list/users-list.mananger';

export const debounce = (obs$: Observable<any>) => obs$.pipe(debounceTime(100));

@Component({
  selector: 'dcs-orders-list-page',
  template: `
    <dcs-orders-list
      [orders]="orders$ | async"
      [loaded]="ordersLoaded$ | async"
      [loading]="loading$ | async"
      [updating]="updating$ | async"
      (doOrderCreate)="createOrder()"
    ></dcs-orders-list>
  `,
})
export class OrdersListPageComponent extends StoreComponent implements OnInit {
  public orders$: Observable<Order[]>;
  public ordersLoaded$: Observable<boolean>;
  public productsLoaded$: Observable<boolean>;
  public usersLoaded$: Observable<boolean>;
  public loading$: Observable<boolean>;
  public updating$: Observable<boolean>;

  constructor(protected store: Store<State>, protected cd: ChangeDetectorRef) {
    super(store, cd);

    this.orders$ = this.select(ordersListSelectors.collection).pipe(debounce);
    this.ordersLoaded$ = this.select(ordersListSelectors.loaded);
    this.productsLoaded$ = this.select(productsListSelectors.loaded);
    this.usersLoaded$ = this.select(usersListManager.selectors.loaded);
    this.loading$ = this.select(ordersListSelectors.loading);
    this.updating$ = this.select(ordersListSelectors.updating);
  }

  public ngOnInit() {
    this.dispatchIfNotLoaded(this.productsLoaded$, new FetchProductsList());
    this.dispatchIfNotLoaded(this.usersLoaded$, new FetchUsersList());
    this.dispatchIfNotLoaded(this.ordersLoaded$, new FetchOrdersList());
  }

  public createOrder() {
    console.log('creating');
    this.store.dispatch(new CreateCurrentOrder());
  }
}
