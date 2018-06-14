import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContainerComponent } from '@dcs/ngx-tools';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { currentUserSelectors } from './../../reducers/users/current-user/current-user.selectors';
import { User } from './../../reducers/users/models/user.class';
import { State } from '../../reducers';
import {
  FetchCurrentUser,
  UpdateCurrentUser,
} from './../../reducers/users/current-user/current-user.actions';

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
export class UserEditPageComponent extends ContainerComponent implements OnInit {
  public user$: Observable<User>;
  public updating$: Observable<boolean>;
  public loading$: Observable<boolean>;
  public error$: Observable<any>;

  constructor(private store: Store<State>, private route: ActivatedRoute) {
    super();

    this.user$ = this.store.select(currentUserSelectors.entity);
    this.updating$ = this.store.select(currentUserSelectors.updating);
    this.loading$ = this.store.select(currentUserSelectors.loading);
    this.error$ = this.store.select(currentUserSelectors.error);
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
