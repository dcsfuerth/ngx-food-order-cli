import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StoreComponent } from '@dcs/ngx-tools';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../../reducers';
import { FetchSimpleUser } from '../../reducers/simple-user/simple-user.actions';
import { User } from '../../reducers/simple-user/simple-user.class';
import { simpleUserManager } from '../../reducers/simple-user/simple-user.manager';
import { FetchSimpleUsers } from '../../reducers/simple-users/simple-users.actions';
import { simpleUsersManager } from '../../reducers/simple-users/simple-users.manager';

@Component({
  selector: 'dcs-simple-reducers-page',
  templateUrl: './simple-reducers-page.component.html',
  styleUrls: ['./simple-reducers-page.component.scss'],
})
export class SimpleReducersPageComponent extends StoreComponent implements OnInit {
  public user$: Observable<User>;
  public users$: Observable<User[]>;

  constructor(store: Store<State>, cd: ChangeDetectorRef) {
    super(store, cd);

    this.user$ = this.select(simpleUserManager.selectors.entity);
    this.users$ = this.select(simpleUsersManager.selectors.collection);
  }

  ngOnInit() {
    this.dispatch(new FetchSimpleUser());
    this.dispatch(new FetchSimpleUsers());
  }
}
