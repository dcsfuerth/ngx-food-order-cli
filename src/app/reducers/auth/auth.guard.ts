import { State } from '..';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { Go } from '@dcs/ngx-tools';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { State as AuthState } from './auth.reducer';
import { subStateSelector } from './auth.selectors';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  private authState$: Observable<AuthState>;

  constructor(private store: Store<State>) {
    this.authState$ = this.store.pipe(select(subStateSelector));
  }

  public canActivate(): Observable<boolean> {
    return this.checkIsLoggedIn();
  }

  public canActivateChild(): Observable<boolean> {
    return this.checkIsLoggedIn();
  }

  private checkIsLoggedIn(): Observable<boolean> {
    return this.authState$.pipe(
      map(authState => {
        const authenticated: boolean = !!authState.entity.accessToken;
        if (!authenticated) {
          this.store.dispatch(new Go({ path: ['/auth', 'login'] }));
        }
        return authenticated;
      })
    );
  }
}
