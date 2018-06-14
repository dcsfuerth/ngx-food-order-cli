import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContainerComponent, StoreComponent } from '@dcs/ngx-tools';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { currentProductSelectors } from './../../reducers/products/current-product/current-product.selectors';
import { Product } from './../../reducers/products/models/product.class';
import { State } from '../../reducers';
import {
  FetchCurrentProduct,
  UpdateCurrentProduct,
} from './../../reducers/products/current-product/current-product.actions';

@Component({
  selector: 'dcs-edit-product-page',
  template: `
    <dcs-product-form
      [product]="product$ | async"
      [updating]="updating$ | async"
      [loading]="loading$ | async"
      [error]="error$ | async"
      (doSave)="update($event)"
    ></dcs-product-form>
  `,
})
export class ProductEditPageComponent extends StoreComponent implements OnInit {
  public product$: Observable<Product>;
  public updating$: Observable<boolean>;
  public loading$: Observable<boolean>;
  public error$: Observable<any>;

  constructor(
    protected store: Store<State>,
    protected cd: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    super(store, cd);
  }

  public ngOnInit() {
    this.product$ = this.store.select(currentProductSelectors.entity);
    this.updating$ = this.store.select(currentProductSelectors.updating);
    this.loading$ = this.store.select(currentProductSelectors.loading);
    this.error$ = this.store.select(currentProductSelectors.error);

    this.subscribeToObservable(this.route.params, params => {
      this.store.dispatch(new FetchCurrentProduct(params.id));
    });
  }
  public update(product: Product) {
    this.dispatch(new UpdateCurrentProduct(product));
  }
}
