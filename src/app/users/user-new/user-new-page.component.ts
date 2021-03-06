import { ChangeDetectorRef, Component } from '@angular/core';
import { StoreComponent } from '@dcs/ngx-tools';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../reducers/users/models/user.class';
import { State } from '../../reducers';

import {
  CreateCurrentUser,
  ResetCurrentUser,
} from '../../reducers/users/current-user/current-user.actions';
import { currentUserManager } from '../../reducers/users/current-user/current-user.manager';

@Component({
  selector: 'dcs-user-new-page',
  template: `
    <dcs-user-form
      [user]="user$ | async"
      [updating]="updating$ | async"
      [error]="error$ | async"
      (doSave)="update($event)"
    ></dcs-user-form>
  `,
})
export class UserNewPageComponent extends StoreComponent {
  public user$: Observable<User>;
  public updating$: Observable<boolean>;
  public error$: Observable<boolean>;

  constructor(protected store: Store<State>, protected cd: ChangeDetectorRef) {
    super(store, cd);
    this.store.dispatch(new ResetCurrentUser());

    this.user$ = this.select(currentUserManager.selectors.entity);
    this.updating$ = this.select(currentUserManager.selectors.updating);
    this.error$ = this.select(currentUserManager.selectors.error);
  }

  public update(user: User) {
    this.store.dispatch(new CreateCurrentUser(user));
  }
}
