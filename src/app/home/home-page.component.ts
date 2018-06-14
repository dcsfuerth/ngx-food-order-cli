import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StoreComponent } from '@dcs/ngx-tools';
import { ApiGetRequest, ApiRequest } from '@dcs/ngx-tools';
import { Store } from '@ngrx/store';
import { schema } from 'normalizr';
import { State } from '../reducers';
import { Greet, GreetWorld } from '../reducers/home/home.actions';
import { greetingSelector } from '../reducers/home/home.selectors';
import { Product } from '../reducers/products/models/product.class';
import { FetchProductsList } from '../reducers/products/products-list/products-list.actions';
import { productsListSelectors } from '../reducers/products/products-list/products-list.selectors';

const userSchema = new schema.Entity('users');
const usersSchema = new schema.Array(userSchema);

@Component({
  selector: 'dcs-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent extends StoreComponent implements OnInit {
  public greeting = '';

  constructor(protected store: Store<State>, protected cd: ChangeDetectorRef) {
    super(store, cd);
  }

  public ngOnInit() {
    this.select(greetingSelector, greeting => {
      this.greeting = greeting;
    });

    setTimeout(() => {
      this.dispatch(new GreetWorld());
    }, 1000);

    setTimeout(() => {
      this.dispatch(new Greet('DCS'));
    }, 5000);
  }
}
