import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../reducers/products/models/product.class';

@Component({
  selector: 'dcs-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnChanges {
  @Input() public product: Product;
  @Input() public updating: boolean;
  @Input() public loading: boolean;
  @Input() public error: HttpErrorResponse | null;
  @Output() public doSave = new EventEmitter<Product>();

  public form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      id: [''],
      articleId: ['', Validators.required],
      label: ['', Validators.required],
      price: [0, Validators.required],
    });
  }

  public ngOnChanges() {
    this.form.setValue(this.product.toObject());
  }

  public save() {
    if (this.form.valid) {
      this.doSave.emit(this.product.merge(this.form.value));
    }
  }
}
