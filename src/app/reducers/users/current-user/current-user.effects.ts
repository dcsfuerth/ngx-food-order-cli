import { Injectable } from '@angular/core';
import { Go } from '@dcs/ngx-tools';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mapTo } from 'rxjs/operators';
import { createActions } from './current-user.actions';

@Injectable()
export class CurrentUserEffects {
  @Effect()
  redirectAfterUserCreate$ = this.actions$.pipe(
    ofType(createActions.success),
    mapTo(new Go({ path: ['users'] }))
  );

  constructor(private actions$: Actions) {}
}
