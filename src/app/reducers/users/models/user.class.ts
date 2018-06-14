import { ViewModel } from '@dcs/ngx-tools';
import { IPlanet, Planet } from './planet.class';

export interface IUser {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  planet: IPlanet;
}

export class User extends ViewModel<IUser> {
  protected static readonly defaults = {
    id: '',
    email: '',
    firstname: '',
    lastname: '',
    planet: { name: '' },
  };

  public id: string;
  public email: string;
  public firstname: string;
  public lastname: string;

  protected planetInstance: Planet;

  get name(): string {
    return this.persisted ? `${this.firstname} ${this.lastname}` : 'New User';
  }

  get planet() {
    return this.getInstance('planet', Planet);
  }

  get persisted(): boolean {
    return !isNaN(parseInt(this.id, 0));
  }

  constructor(props: Partial<IUser>) {
    props = { ...User.defaults, ...props };
    super(props);
  }
}
