import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { GreetWorld } from '../reducers/home/home.actions';
import { greetingSelector } from '../reducers/home/home.selectors';

@Component({
  selector: 'dcs-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  public greeting = '';

  constructor(private store: Store<State>, private cd: ChangeDetectorRef) {}

  public ngOnInit() {
    this.store.select(greetingSelector).subscribe(greeting => {
      console.warn('greeting', greeting);
      this.greeting = greeting;
      this.cd.markForCheck();
    });

    setTimeout(() => {
      this.store.dispatch(new GreetWorld());
    }, 1000);
  }
}
