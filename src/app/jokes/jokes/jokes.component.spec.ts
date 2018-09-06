import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureComponentTestSuite } from '@dcs/ngx-tools/testing';
import { JokesComponent } from './jokes.component';

describe('JokesComponent', () => {
  configureComponentTestSuite();

  let component: JokesComponent;
  let fixture: ComponentFixture<JokesComponent>;

  beforeAll(async () => {
    await TestBed.configureTestingModule({
      declarations: [JokesComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JokesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
