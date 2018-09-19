import { Injectable } from '@angular/core';
import { Go, Reset, ResetActionTypes } from '@dcs/ngx-tools';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mapTo } from 'rxjs/operators';
import { AuthActionTypes, authenticateActions, LoginSuccess } from './auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType(authenticateActions.success),
    mapTo(new LoginSuccess())
  );

  @Effect()
  redirectAfterAuthenticate$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccess),
    mapTo(new Go({ path: ['/home'] }))
  );

  @Effect()
  resetAfterLogout$ = this.actions$.pipe(
    ofType(AuthActionTypes.Logout),
    mapTo(new Reset())
  );

  @Effect()
  redirectAfterReset$ = this.actions$.pipe(
    ofType(ResetActionTypes.Reset),
    mapTo(new Go({ path: ['auth', 'login'] }))
  );

  constructor(private actions$: Actions) {}
}
