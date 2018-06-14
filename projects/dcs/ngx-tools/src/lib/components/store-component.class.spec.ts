import { ChangeDetectorRef, Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of, Subject } from 'rxjs';
import { StoreComponent } from './store-component.class';

describe('StoreComponent', () => {
  @Component({
    selector: 'dcs-test-component',
    template: '',
  })
  class TestComponent extends StoreComponent {
    constructor(public store: Store<any>, protected cd: ChangeDetectorRef) {
      super(store, cd);
    }
  }

  let fixture: ComponentFixture<TestComponent>;
  let subject: TestComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [TestComponent],
      schemas: [],
      providers: [ChangeDetectorRef],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    subject = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('dispatch', () => {
    let spy: jest.SpyInstance;

    beforeEach(() => {
      spy = jest.spyOn(subject.store, 'dispatch');
    });

    afterEach(() => {
      spy.mockClear();
    });

    it('calls store dispatch', () => {
      const action = { type: 'TEST_ACTION' };
      subject.dispatch(action);
      expect(spy).toHaveBeenCalledWith(action);
    });
  });

  describe('dispatchIfNotLoaded', () => {
    let cb: jest.Mock;

    beforeEach(() => {
      cb = jest.fn().mockImplementation(() => ({ type: 'TEST_ACTION' }));
    });

    it('dispatches the given callback if not loaded', () => {
      subject.dispatchIfNotLoaded(of(false), cb);
      expect(cb).toHaveBeenCalled();
    });

    it('dispatches the given callback only once', () => {
      subject.dispatchIfNotLoaded(of(false, false, false), cb);
      expect(cb).toHaveBeenCalledTimes(1);
    });

    it('does nothing if already loaded', () => {
      subject.dispatchIfNotLoaded(of(true, false), cb);
      expect(cb).not.toHaveBeenCalled();
    });
  });

  describe('select', () => {
    xit('TODO', () => {});
  });
});
