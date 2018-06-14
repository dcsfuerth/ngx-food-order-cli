import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PresentationalComponent } from '@dcs/ngx-tools';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Item } from './../../reducers/order/models/item.class';
import { Order } from './../../reducers/order/models/order.class';
import { Product } from './../../reducers/products/models/product.class';
import { User } from './../../reducers/users/models/user.class';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'dcs-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderFormComponent extends PresentationalComponent implements OnChanges {
  @Input() public order: Order;
  @Input() public products: Product[];
  @Input() public users: User[];
  @Input() public updating: boolean;
  @Input() public loading: boolean;
  @Input() public loaded: boolean;
  @Input() public error: any;
  @Output() public doFormChange = new EventEmitter<any>();

  public form: FormGroup;
  private formReset$: Subject<any> = new Subject();

  get itemsControl(): FormArray {
    return this.form.get('items') as FormArray;
  }

  constructor(private fb: FormBuilder) {
    super();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.order) {
      this.buildForm();
    }
  }

  public getItemFormForIndex(index: number): FormGroup {
    return this.form.get(['items', index]) as FormGroup;
  }

  public completeForm(): void {
    (this.form.get('completed') as FormControl).setValue(true);
  }

  public addRow() {
    this.itemsControl.push(this.getItemForm(new Item()));
  }

  public deleteItem(index: number) {
    this.itemsControl.removeAt(index);
  }

  protected buildForm() {
    this.formReset$.next();
    const items = this.order.items.map(item => this.getItemForm(item));

    this.form = this.fb.group({
      id: [this.order.id],
      completed: [this.order.completed],
      items: this.fb.array(items),
    });

    this.form.valueChanges.pipe(takeUntil(this.formReset$)).subscribe(value => {
      this.doFormChange.emit(value);
    });
  }

  protected getItemForm(item: Item): FormGroup {
    return this.fb.group({
      productId: [item.productId, [Validators.required]],
      userId: [item.userId, [Validators.required]],
      numberOfProducts: [item.numberOfProducts, [Validators.required, Validators.min(1)]],
    });
  }
}
