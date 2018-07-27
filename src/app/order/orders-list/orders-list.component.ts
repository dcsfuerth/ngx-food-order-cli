import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from '../../reducers/order/models/order.class';

@Component({
  selector: 'dcs-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersListComponent {
  @Input() public orders: Order[];
  @Input() public loading: boolean;
  @Input() public loaded: boolean;
  @Input() public updating: boolean;
  @Input() public error: any;
  @Output() public doOrderCreate: EventEmitter<any> = new EventEmitter();

  get showData(): boolean {
    return !this.loading;
  }
}
