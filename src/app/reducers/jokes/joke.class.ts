import { ViewModel } from '@dcs/ngx-tools';

export interface IJoke {
  id: string;
  joke: string;
  categories: string[];
}

export class Joke extends ViewModel<IJoke> {
  protected static readonly defaults: IJoke = {
    id: '',
    joke: '',
    categories: ['nerdy'],
  };

  public id: string;
  public joke: string;
  public categories: string[];

  constructor(props: Partial<IJoke> = {}) {
    props = { ...Joke.defaults, ...props };
    super(props);
  }
}
