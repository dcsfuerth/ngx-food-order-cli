import { Injectable } from '@angular/core';
import { Go } from '@dcs/ngx-tools';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mapTo } from 'rxjs/operators';
import { currentUserManager } from './current-user.manager';

@Injectable()
export class CurrentUserEffects {
  @Effect()
  redirectAfterUserCreate$ = this.actions$.pipe(
    ofType(currentUserManager.actions.create.success),
    mapTo(new Go({ path: ['users'] }))
  );

  constructor(private actions$: Actions) {}
}
