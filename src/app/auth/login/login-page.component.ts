import { ChangeDetectorRef, Component } from '@angular/core';
import { StoreComponent } from '@dcs/ngx-tools';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../../reducers';
import { Authenticate } from '../../reducers/auth/auth.actions';
import { authFailedSelector } from '../../reducers/auth/auth.selectors';

@Component({
  selector: 'dcs-login-page',
  template: `
    <dcs-login
      [authFailed]="authFailed$ | async"
      (doAuthenticate)="authenticate($event)">
    </dcs-login>`,
})
export class LoginPageComponent extends StoreComponent {
  public authFailed$: Observable<boolean>;

  constructor(protected store: Store<State>, protected cd: ChangeDetectorRef) {
    super(store, cd);

    this.authFailed$ = this.select(authFailedSelector);
  }

  public authenticate(email: string) {
    this.store.dispatch(new Authenticate(email));
  }
}
