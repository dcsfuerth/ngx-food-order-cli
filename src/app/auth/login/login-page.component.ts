import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { APP_ENVIRONMENT, IEnvironment, StoreComponent } from '@dcs/ngx-tools';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoginData } from './types';
import { State } from '../../reducers';
import { Authenticate } from '../../reducers/auth/auth.actions';
import { authFailedSelector } from '../../reducers/auth/auth.selectors';

@Component({
  selector: 'dcs-login-page',
  template: `
    <dcs-login
      [authFailed]="authFailed$ | async"
      [testAccount]="testAccount"
      (doAuthenticate)="authenticate($event)">
    </dcs-login>`,
})
export class LoginPageComponent extends StoreComponent {
  public authFailed$: Observable<boolean>;
  public testAccount: any = {};

  constructor(
    store: Store<State>,
    cd: ChangeDetectorRef,
    @Inject(APP_ENVIRONMENT) private env: IEnvironment
  ) {
    super(store, cd);

    this.authFailed$ = this.select(authFailedSelector);

    if (!this.env.production) {
      import('../../../dev-users.json').then(m => {
        this.testAccount = m.default[0];
      });
    }
  }

  public authenticate(data: LoginData) {
    this.store.dispatch(new Authenticate(data));
  }
}
