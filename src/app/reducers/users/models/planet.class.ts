import { ViewModel } from '@dcs/ngx-tools';

export interface IPlanet {
  name: string;
}

export class Planet extends ViewModel<IPlanet> {
  protected static readonly defaults = {
    name: '',
  };

  public name: string;
}
