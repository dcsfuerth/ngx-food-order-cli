import { keys } from 'ramda';
import { Constructor } from './normalized-entity.selectors';
import { getHash } from '../utils/hash';

export function generateGetter<T extends object>(instance: ViewModel<T>, key: string) {
  if (Object.getOwnPropertyDescriptor(Object.getPrototypeOf(instance), key) === undefined) {
    Object.defineProperty(instance, key, {
      get() {
        return instance.getProp(key);
      },
      configurable: true,
      enumerable: true,
    });
  }
}

export abstract class ViewModel<T extends object> {
  protected instanceCache: { [key: string]: any } = {};
  protected _identifier = '';

  get loaded(): boolean {
    // naive implementation as default: presence of id
    // overwrite when necessary
    return !!(this as any).id;
  }

  get identifier(): string {
    if (!this._identifier) {
      this._identifier = getHash(this.props);
    }
    return this._identifier;
  }

  constructor(protected props: Partial<T> = {}) {
    keys(props).forEach((key: any) => {
      generateGetter(this, key);
    });
    this.init();
    Object.seal(this);
  }

  // tslint:disable-next-line:no-empty
  public init(): void {}

  public getProp(key: string) {
    return (<any>this.props)[key];
  }

  public merge(data: { [key: string]: any }): this {
    const props = Object.assign({}, this.toObject(), data);
    return new (<any>this.constructor)(props);
  }

  public toJSON(): string {
    return JSON.stringify(this.props);
  }

  public toObject(): T {
    return { ...(this.props as object) } as T;
  }

  protected getInstance(key: string, konstructor: Constructor<any>, collection = false) {
    if (!this.instanceCache[key]) {
      if (collection) {
        this.instanceCache[key] = this.getProp(key).map((item: any) => new konstructor(item));
      } else {
        this.instanceCache[key] = new konstructor(this.getProp(key));
      }
    }

    return this.instanceCache[key];
  }
}
