import { State } from '..';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { State as AuthState } from './auth.reducer';
import { subStateSelector } from './auth.selectors';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  private authState$: Observable<AuthState>;

  constructor(private store: Store<State>, private router: Router) {
    this.authState$ = this.store.select(subStateSelector);
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
        const authenticated: boolean = !!authState.entity;
        if (!authenticated) {
          this.router.navigate(['/auth/login']);
        }
        return !!authState.entity;
      })
    );
  }
}
