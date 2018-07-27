import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PresentationalComponent } from '@dcs/ngx-tools';
import { Product } from '../../reducers/products/models/product.class';

@Component({
  selector: 'dcs-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent extends PresentationalComponent {
  @Input() public products: Product[];
  @Input() public loading: boolean;
  @Input() public updating: boolean;
  @Input() public error: any;
  @Output() public doDelete = new EventEmitter<Product>();

  get showData(): boolean {
    return !this.loading;
  }

  public removeProduct(product: Product) {
    this.doDelete.emit(product);
  }
}
