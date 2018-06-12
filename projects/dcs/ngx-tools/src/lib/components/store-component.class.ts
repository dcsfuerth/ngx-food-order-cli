import { ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { Observable, OperatorFunction } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ContainerComponent } from './container-component.class';

export abstract class StoreComponent extends ContainerComponent {
  constructor(protected store: Store<any>, protected cd: ChangeDetectorRef) {
    super();
  }

  public dispatch<T extends Action>(action: T): void {
    return this.store.dispatch(action);
  }

  public dispatchIfNotLoaded(loaded$: Observable<boolean>, callback: () => Action): void {
    this.subscribeToObservable(loaded$.pipe(take(1)), loaded => {
      if (!loaded) {
        this.dispatch(callback());
      }
    });
  }

  public select<R>(
    selector: (state: any) => R,
    cb: (data: R) => void,
    notifyChange: boolean = true,
    operators: OperatorFunction<any, R>[] = []
  ): void {
    const obs = this.store.select(selector).pipe(...operators);

    this.subscribeToObservable(obs, data => {
      cb(data);
      if (notifyChange) {
        this.cd.markForCheck();
      }
    });
  }
}
