import { of, Subject } from 'rxjs';
import { ContainerComponent } from './container-component.class';

describe('ContainerComponent', () => {
  class TestComponent extends ContainerComponent {}

  let subject: TestComponent;

  beforeEach(() => {
    subject = new TestComponent();
  });

  describe('ngOnDestroy', () => {
    it('calls onDestroy$.next', () => {
      spyOn((subject as any).onDestroy$, 'next');
      subject.ngOnDestroy();
      expect((subject as any).onDestroy$.next).toHaveBeenCalled();
    });
  });

  describe('subscribeToObservable', () => {
    let cb: jest.Mock<any>;
    let obs$: Subject<any>;

    beforeEach(() => {
      cb = jest.fn();
      obs$ = new Subject();
      subject.subscribeToObservable(obs$, cb);
    });

    it('calls the callback fn', () => {
      obs$.next();
      expect(cb).toHaveBeenCalled();
    });

    it('unsubscribes on ngOnDestroy', () => {
      obs$.next();
      subject.ngOnDestroy();
      obs$.next();
      expect(cb).toHaveBeenCalledTimes(1);
    });
  });
});
