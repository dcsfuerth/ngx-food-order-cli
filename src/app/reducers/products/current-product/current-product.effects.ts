import { Injectable } from '@angular/core';
import { Go } from '@dcs/ngx-tools';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mapTo } from 'rxjs/operators';
import { createActions } from './current-product.actions';

@Injectable()
export class CurrentProductEffects {
  @Effect()
  redirectAfterProductCreate$ = this.actions$.pipe(
    ofType(createActions.success),
    mapTo(new Go({ path: ['products'] }))
  );

  constructor(private actions$: Actions) {}
}
