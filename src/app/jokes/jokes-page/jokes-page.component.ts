import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { StoreComponent } from '@dcs/ngx-tools';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../../reducers';
import { Joke } from '../../reducers/jokes/joke.class';
import { FetchJokes } from '../../reducers/jokes/jokes.actions';
import { jokesManager } from '../../reducers/jokes/jokes.manager';

@Component({
  selector: 'dcs-jokes-page',
  template: `
    <dcs-jokes
      [jokes]="jokes$ | async"
      [loading]="loading$ | async"
    ></dcs-jokes>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JokesPageComponent extends StoreComponent implements OnInit, OnDestroy {
  public jokes$: Observable<Joke[]>;
  public loading$: Observable<boolean>;
  private interval: NodeJS.Timer;

  constructor(protected store: Store<State>, protected cd: ChangeDetectorRef) {
    super(store, cd);
  }

  public ngOnInit() {
    this.jokes$ = this.select(jokesManager.selectors.collection);
    this.loading$ = this.select(jokesManager.selectors.loading);

    this.dispatch(new FetchJokes());

    this.interval = setInterval(() => {
      this.dispatch(new FetchJokes());
    }, 30000);
  }

  public ngOnDestroy() {
    super.ngOnDestroy();

    clearInterval(this.interval);
  }
}
