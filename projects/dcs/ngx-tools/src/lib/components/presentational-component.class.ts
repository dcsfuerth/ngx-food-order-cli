import { ViewModel } from '../store/selectors/view-model.class';

export abstract class PresentationalComponent {
  public trackByIndex(index: number): number {
    return index;
  }

  public trackByIdentifier(_: number, item: ViewModel<any>) {
    return item.identifier;
  }
}
