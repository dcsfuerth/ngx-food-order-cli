import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreComponent } from '@dcs/ngx-tools';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../../reducers';
import { currentProductSelectors } from '../../reducers/products/current-product/current-product.selectors';
import { Product } from '../../reducers/products/models/product.class';
import {
  FetchCurrentProduct,
  UpdateCurrentProduct,
} from '../../reducers/products/current-product/current-product.actions';

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
    this.product$ = this.select(currentProductSelectors.entity);
    this.updating$ = this.select(currentProductSelectors.updating);
    this.loading$ = this.select(currentProductSelectors.loading);
    this.error$ = this.select(currentProductSelectors.error);

    this.subscribeToObservable(this.route.params, params => {
      this.store.dispatch(new FetchCurrentProduct(params.id));
    });
  }
  public update(product: Product) {
    this.dispatch(new UpdateCurrentProduct(product));
  }
}
