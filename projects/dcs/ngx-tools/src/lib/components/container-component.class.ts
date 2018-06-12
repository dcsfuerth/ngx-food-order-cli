import { OnDestroy } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

export abstract class ContainerComponent implements OnDestroy {
  protected onDestroy$ = new Subject();

  public ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  public subscribeToObservable<T>(obs$: Observable<T>, callback: (data: T) => void) {
    obs$.pipe(takeUntil(this.onDestroy$)).subscribe(callback.bind(this));
  }
}
