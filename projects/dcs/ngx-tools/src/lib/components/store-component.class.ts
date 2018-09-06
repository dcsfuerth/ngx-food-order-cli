import { ChangeDetectorRef } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import { Observable, OperatorFunction } from 'rxjs';
import { take } from 'rxjs/operators';
import { ContainerComponent } from './container-component.class';
import { ISelector } from '../store/selectors/normalized-entity.selectors';

export abstract class StoreComponent extends ContainerComponent {
  constructor(protected store: Store<any>, protected cd: ChangeDetectorRef) {
    super();
  }

  public dispatch<T extends Action>(action: T): void {
    return this.store.dispatch(action);
  }

  public dispatchIfNotLoaded(loaded$: Observable<boolean>, callback: Action): void {
    this.subscribeToObservable(loaded$.pipe(take(1)), loaded => {
      if (!loaded) {
        this.dispatch(callback);
      }
    });
  }

  public select<S, R>(selector: ISelector<S, R>): Observable<R> {
    return this.store.pipe(select(selector));
  }

  public subscribeToState<R>(
    selector: (state: any) => R,
    cb: (data: R) => void,
    notifyChange: boolean = true,
    operators: OperatorFunction<any, R>[] = []
  ): void {
    let obs: Observable<R> = this.store.pipe(select(selector));

    obs = operators.reduce((ob: Observable<R>, op: OperatorFunction<any, R>) => ob.pipe(op), obs);

    this.subscribeToObservable(obs, data => {
      cb(data);

      if (notifyChange) {
        this.cd.markForCheck();
      }
    });
  }
}
