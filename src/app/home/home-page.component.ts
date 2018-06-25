import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StoreComponent } from '@dcs/ngx-tools';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { Greet, GreetWorld } from '../reducers/home/home.actions';
import { greetingSelector } from '../reducers/home/home.selectors';

@Component({
  selector: 'dcs-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent extends StoreComponent implements OnInit {
  public greeting = '';

  constructor(protected store: Store<State>, protected cd: ChangeDetectorRef) {
    super(store, cd);
  }

  public ngOnInit() {
    this.substribeToState(greetingSelector, greeting => {
      this.greeting = greeting;
    });

    setTimeout(() => {
      this.dispatch(new GreetWorld());
    }, 1000);

    setTimeout(() => {
      this.dispatch(new Greet('DCS'));
    }, 5000);
  }
}
