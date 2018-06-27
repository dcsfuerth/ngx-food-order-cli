import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StoreComponent } from '@dcs/ngx-tools';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { Logout } from '../../reducers/auth/auth.actions';
import { isLoggedInSelector } from '../../reducers/auth/auth.selectors';

@Component({
  selector: 'dcs-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainNavigationComponent extends StoreComponent implements OnInit {
  public isLoggedIn: boolean;

  constructor(protected store: Store<State>, protected cd: ChangeDetectorRef) {
    super(store, cd);

    this.subscribeToState(isLoggedInSelector, isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  ngOnInit() {}

  public logout() {
    this.store.dispatch(new Logout());
  }
}
