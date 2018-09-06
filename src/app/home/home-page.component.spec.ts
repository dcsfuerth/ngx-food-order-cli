import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { configureComponentTestSuite } from '@dcs/ngx-tools/testing';
import { StoreModule } from '@ngrx/store';
import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
  configureComponentTestSuite();

  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeAll(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), NoopAnimationsModule],
      declarations: [HomePageComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
