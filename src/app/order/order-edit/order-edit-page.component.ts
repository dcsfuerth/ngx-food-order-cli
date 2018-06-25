import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreComponent } from '@dcs/ngx-tools';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { currentOrderSelectors } from './../../reducers/order/current-order/current-order.selectors';
import { IOrder, Order } from './../../reducers/order/models/order.class';
import { Product } from './../../reducers/products/models/product.class';
import { FetchProductsList } from './../../reducers/products/products-list/products-list.actions';
import { productsListSelectors } from './../../reducers/products/products-list/products-list.selectors';
import { User } from './../../reducers/users/models/user.class';
import { FetchUsersList } from './../../reducers/users/users-list/users-list.actions';
import { State } from '../../reducers';
import { usersListManager } from '../../reducers/users/users-list/users-list.mananger';
import {
  FetchCurrentOrder,
  UpdateCurrentOrder,
} from '../../reducers/order/current-order/current-order.actions';

@Component({
  selector: 'dcs-order-edit',
  template: `
    <dcs-order-form
      [order]="order$ | async"
      [products]="products$ | async"
      [users]="users$ | async"
      [loading]="ordersLoading$ | async"
      [loaded]="ordersLoaded$ | async"
      [updating]="updating$ | async"
      [error]="error$ | async"
      (doFormChange)="updateState($event)"
    ></dcs-order-form>
  `,
})
export class OrderEditPageComponent extends StoreComponent {
  public order$: Observable<Order>;
  public ordersLoaded$: Observable<boolean>;
  public ordersLoading$: Observable<boolean>;
  public updating$: Observable<boolean>;
  public error$: Observable<any>;
  public productsLoaded$: Observable<boolean>;
  public usersLoaded$: Observable<boolean>;
  public products$: Observable<Product[]>;
  public users$: Observable<User[]>;
  private formChanged$: Subject<any> = new Subject<any>();

  constructor(
    protected store: Store<State>,
    protected cd: ChangeDetectorRef,
    route: ActivatedRoute
  ) {
    super(store, cd);

    this.formChanged$ = new Subject();
    console.warn('CONST', Object.isFrozen(this.formChanged$));

    this.order$ = this.select(currentOrderSelectors.entity);
    this.ordersLoaded$ = this.select(currentOrderSelectors.loaded);
    this.ordersLoading$ = this.select(currentOrderSelectors.loading);
    this.updating$ = this.select(currentOrderSelectors.updating);
    this.error$ = this.select(currentOrderSelectors.error);
    this.productsLoaded$ = this.select(productsListSelectors.loaded);
    this.usersLoaded$ = this.select(usersListManager.selectors.loaded);
    this.products$ = this.select(productsListSelectors.collection);
    this.users$ = this.select(usersListManager.selectors.collection);

    this.dispatchIfNotLoaded(this.productsLoaded$, new FetchProductsList());
    this.dispatchIfNotLoaded(this.usersLoaded$, new FetchUsersList());

    this.subscribeToObservable(route.params, params => {
      this.store.dispatch(new FetchCurrentOrder(params.id));
    });
  }

  public updateState(formData: IOrder) {
    console.warn(
      'FC',
      this.formChanged$,
      Object.isFrozen(this.formChanged$),
      Object.isFrozen(new Subject()),
      Object.isFrozen(this)
    );

    this.formChanged$.next(true);

    this.store.dispatch(
      // TODO: trace stange sealed error inside rxjs
      new UpdateCurrentOrder(new Order(formData), this.formChanged$)
      // new UpdateCurrentOrder(new Order(formData))
    );
  }
}
