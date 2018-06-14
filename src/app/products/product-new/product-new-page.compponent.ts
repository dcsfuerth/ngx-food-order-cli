import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StoreComponent } from '@dcs/ngx-tools';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { currentProductSelectors } from './../../reducers/products/current-product/current-product.selectors';
import { Product } from './../../reducers/products/models/product.class';
import { State } from '../../reducers';
import {
  CreateCurrentProduct,
  ResetCurrentProduct,
} from './../../reducers/products/current-product/current-product.actions';

@Component({
  selector: 'dcs-product-new-page',
  template: `
    <dcs-product-form
      [product]="product$ | async"
      [updating]="updating$ | async"
      [error]="error$ | async"
      (doSave)="update($event)"
    ></dcs-product-form>
  `,
})
export class ProductNewPageComponent extends StoreComponent implements OnInit {
  public product$: Observable<Product>;
  public updating$: Observable<boolean>;
  public error$: Observable<boolean>;

  constructor(protected store: Store<State>, protected cd: ChangeDetectorRef) {
    super(store, cd);
    this.store.dispatch(new ResetCurrentProduct());
  }

  public ngOnInit(): void {
    this.product$ = this.store.select(currentProductSelectors.entity);
    this.updating$ = this.store.select(currentProductSelectors.updating);
    this.error$ = this.store.select(currentProductSelectors.error);
  }

  public update(product: Product) {
    this.store.dispatch(new CreateCurrentProduct(product));
  }
}
