import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreComponent } from '@dcs/ngx-tools';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from './../../reducers/users/models/user.class';
import { State } from '../../reducers';
import {
  FetchCurrentUser,
  UpdateCurrentUser,
} from './../../reducers/users/current-user/current-user.actions';
import { currentUserManager } from '../../reducers/users/current-user/current-user.manager';

@Component({
  selector: 'dcs-user-edit-page',
  template: `
    <dcs-user-form
      [user]="user$ | async"
      [updating]="updating$ | async"
      [loading]="loading$ | async"
      [error]="error$ | async"
      (doSave)="update($event)"
    ></dcs-user-form>
  `,
})
export class UserEditPageComponent extends StoreComponent implements OnInit {
  public user$: Observable<User>;
  public updating$: Observable<boolean>;
  public loading$: Observable<boolean>;
  public error$: Observable<any>;

  constructor(
    protected store: Store<State>,
    protected cd: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    super(store, cd);

    this.user$ = this.select(currentUserManager.selectors.entity);
    this.updating$ = this.select(currentUserManager.selectors.updating);
    this.loading$ = this.select(currentUserManager.selectors.loading);
    this.error$ = this.select(currentUserManager.selectors.error);
  }

  public ngOnInit() {
    this.subscribeToObservable(this.route.params, params => {
      this.store.dispatch(new FetchCurrentUser(params.id));
    });
  }

  public update(user: User) {
    this.store.dispatch(new UpdateCurrentUser(user));
  }
}
