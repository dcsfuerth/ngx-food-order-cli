// import { ViewModel } from '@dcs/redux-tools';

export abstract class PresentationalComponent {
  public trackByIndex(index: number): number {
    return index;
  }

  // public trackByIdentifier(_: number, item: ViewModel<any>) {
  //   return item.identifier;
  // }

  public trackByIdentifier(_: number, item: any) {
    return item.identifier;
  }
}
