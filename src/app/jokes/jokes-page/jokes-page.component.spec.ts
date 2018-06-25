import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { JokesPageComponent } from './jokes-page.component';

describe('JokesPageComponent', () => {
  let comp: JokesPageComponent;
  let fixture: ComponentFixture<JokesPageComponent>;

  beforeEach(() => {
    const changeDetectorRefStub = {};
    const storeStub = {};
    TestBed.configureTestingModule({
      declarations: [JokesPageComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ChangeDetectorRef, useValue: changeDetectorRefStub },
        { provide: Store, useValue: storeStub },
      ],
    });
    fixture = TestBed.createComponent(JokesPageComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });
});
