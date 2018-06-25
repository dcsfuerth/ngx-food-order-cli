import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Joke } from '../../reducers/jokes/joke.class';

@Component({
  selector: 'dcs-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JokesComponent {
  @Input() jokes: Joke[];
  @Input() loading: boolean;
}
