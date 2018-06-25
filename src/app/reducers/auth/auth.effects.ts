import { Injectable } from '@angular/core';
import { Go, IAction, Reset } from '@dcs/ngx-tools';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { filter, flatMap, mapTo } from 'rxjs/operators';
import { AuthActionTypes, authenticateActions, LoginSuccess } from './auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType(authenticateActions.success),
    filter((action: IAction) => action.payload.length),
    mapTo(new LoginSuccess())
  );

  @Effect()
  redirectAfterAuthenticate$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginSuccess),
    mapTo(new Go({ path: ['/home'] }))
  );

  @Effect()
  redirectAndResetAfterLogout$ = this.actions$.pipe(
    ofType(AuthActionTypes.Logout),
    flatMap(() => of(new Reset(), new Go({ path: ['auth', 'login'] })))
  );

  constructor(private actions$: Actions) {}
}
