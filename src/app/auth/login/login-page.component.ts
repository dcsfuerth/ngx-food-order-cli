import { Component } from '@angular/core';
import { ContainerComponent } from '@dcs/ngx-tools';
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
export class LoginPageComponent extends ContainerComponent {
  public authFailed$: Observable<boolean>;

  constructor(private store: Store<State>) {
    super();

    this.authFailed$ = this.store.select(authFailedSelector);
  }

  public authenticate(email: string) {
    this.store.dispatch(new Authenticate(email));
  }
}
