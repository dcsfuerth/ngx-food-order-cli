import { PresentationalComponent } from './presentational-component.class';

describe('PresentationalComponent', () => {
  class TestComponent extends PresentationalComponent {}

  let subject: TestComponent;

  beforeEach(() => {
    subject = new TestComponent();
  });

  describe('trackByIndex', () => {
    it('returns the given index', () => {
      expect(subject.trackByIndex(12)).toEqual(12);
    });
  });

  describe('trackByIndex', () => {
    it('returns the identifier of given item', () => {
      const item: any = { identifier: 'abc12345' };
      expect(subject.trackByIdentifier(12, item)).toEqual(item.identifier);
    });
  });
});
