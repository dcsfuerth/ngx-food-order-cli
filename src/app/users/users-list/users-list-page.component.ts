import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StoreComponent } from '@dcs/ngx-tools';
import { ContainerComponent } from '@dcs/ngx-tools';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { DeleteCurrentUser } from './../../reducers/users/current-user/current-user.actions';
import { State } from '../../reducers';
import { User } from '../../reducers/users/models/user.class';
import { FetchUsersList } from '../../reducers/users/users-list/users-list.actions';
import { usersListSelectors } from '../../reducers/users/users-list/users-list.selectors';

@Component({
  selector: 'dcs-users-list-page',
  template: `
    <dcs-users-list
      [users]="users$ | async"
      [loading]="loading$ | async"
      [updating]="updating$ | async"
      [error]="error$ | async"
      (doDelete)="removeUser($event)"
    ></dcs-users-list>
  `,
})
export class UsersListPageComponent extends StoreComponent implements OnInit {
  public users$: Observable<User[]>;
  public loading$: Observable<boolean>;
  public loaded$: Observable<boolean>;
  public updating$: Observable<boolean>;
  public error$: Observable<any>;

  constructor(protected store: Store<State>, protected cd: ChangeDetectorRef) {
    super(store, cd);
  }

  public ngOnInit(): void {
    this.users$ = this.store.select(usersListSelectors.collection);
    this.loading$ = this.store.select(usersListSelectors.loading);
    this.loaded$ = this.store.select(usersListSelectors.loaded);
    this.updating$ = this.store.select(usersListSelectors.updating);
    this.error$ = this.store.select(usersListSelectors.error);

    this.subscribeToObservable(this.loaded$.pipe(take(1)), loaded => {
      if (!loaded) {
        this.store.dispatch(new FetchUsersList());
      }
    });
  }

  public removeUser(user: User) {
    this.store.dispatch(new DeleteCurrentUser(user));
  }
}
