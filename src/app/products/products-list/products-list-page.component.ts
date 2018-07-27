import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StoreComponent } from '@dcs/ngx-tools';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { DeleteCurrentProduct } from '../../reducers/products/current-product/current-product.actions';
import { Product } from '../../reducers/products/models/product.class';
import { FetchProductsList } from '../../reducers/products/products-list/products-list.actions';
import { productsListSelectors } from '../../reducers/products/products-list/products-list.selectors';
import { State } from '../../reducers';

@Component({
  selector: 'dcs-products-list-page',
  template: `
    <dcs-products-list
      [products]="products$ | async"
      [loading]="loading$ | async"
      [updating]="updating$ | async"
      [error]="error$ | async"
      (doDelete)="removeProduct($event)"
    ></dcs-products-list>
  `,
})
export class ProductsListPageComponent extends StoreComponent implements OnInit {
  public products$: Observable<Product[]>;
  public loading$: Observable<boolean>;
  public loaded$: Observable<boolean>;
  public updating$: Observable<boolean>;
  public error$: Observable<any>;

  constructor(protected store: Store<State>, protected cd: ChangeDetectorRef) {
    super(store, cd);
  }

  public ngOnInit(): void {
    this.products$ = this.store.select(productsListSelectors.collection);
    this.loading$ = this.store.select(productsListSelectors.loading);
    this.loaded$ = this.store.select(productsListSelectors.loaded);
    this.updating$ = this.store.select(productsListSelectors.updating);
    this.error$ = this.store.select(productsListSelectors.error);

    this.subscribeToObservable(this.loaded$.pipe(take(1)), loaded => {
      if (!loaded) {
        this.store.dispatch(new FetchProductsList());
      }
    });
  }

  public removeProduct(product: Product) {
    this.store.dispatch(new DeleteCurrentProduct(product));
  }
}
