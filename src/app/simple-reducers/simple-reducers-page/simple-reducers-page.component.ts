import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StoreComponent } from '@dcs/ngx-tools';
import { Store } from '@ngrx/store';
import { Observable } from '../../../../node_modules/rxjs';
import { State } from '../../reducers';
import { FetchSimpleUser } from '../../reducers/simple-user/simple-user.actions';
import { User } from '../../reducers/simple-user/simple-user.class';
import { simpleUserSelectors } from '../../reducers/simple-user/simple-user.selectors';

@Component({
  selector: 'dcs-simple-reducers-page',
  templateUrl: './simple-reducers-page.component.html',
  styleUrls: ['./simple-reducers-page.component.scss'],
})
export class SimpleReducersPageComponent extends StoreComponent implements OnInit {
  public user$: Observable<User>;

  constructor(store: Store<State>, cd: ChangeDetectorRef) {
    super(store, cd);

    this.user$ = this.select(simpleUserSelectors.entity);
  }

  ngOnInit() {
    this.dispatch(new FetchSimpleUser());
  }
}
